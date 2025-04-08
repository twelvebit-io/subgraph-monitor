import axios from "axios";
import { EndpointConfig, MetaQueryResponse, CheckResult } from "./types";

const META_QUERY = `
query MyQuery {
  _meta {
    deployment
    hasIndexingErrors
    block {
      timestamp
    }
  }
}`;

export class SubgraphMonitor {
  private endpoints: EndpointConfig[];

  constructor(endpoints: EndpointConfig[]) {
    this.endpoints = endpoints;
  }

  private async checkEndpoint(endpoint: EndpointConfig): Promise<CheckResult> {
    const errors: string[] = [];
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    let latency = 0;

    try {
      const response = await axios.post<MetaQueryResponse>(
        endpoint.url,
        {
          query: META_QUERY,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      const meta = response.data.data._meta;

      // Check if deployment exists
      if (!meta.deployment) {
        errors.push("No deployment ID found");
      }

      // Check for indexing errors
      if (meta.hasIndexingErrors) {
        errors.push("Subgraph has indexing errors");
      }

      // Check if timestamp is within 1 hour
      const timeDiff = currentTime - meta.block.timestamp;
      if (timeDiff > 1 * 3600) {
        // 1 hour in seconds
        errors.push(`Subgraph is ${Math.floor(timeDiff / 3600)} hours behind`);
      }

      latency = timeDiff; // Seconds
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errors.push(`Request failed: ${error.message}`);
      } else {
        errors.push("Unknown error occurred");
      }
    }

    return {
      endpoint: endpoint.url,
      name: endpoint.name,
      status: errors.length === 0 ? "healthy 🟢" : "unhealthy 🔴",
      errors,
      timestamp: currentTime,
      latency: latency,
    };
  }

  async checkAll(): Promise<CheckResult[]> {
    const results = await Promise.all(
      this.endpoints.map((endpoint) => this.checkEndpoint(endpoint))
    );
    return results;
  }
}
