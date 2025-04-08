export interface EndpointConfig {
  url: string;
  name: string;
}

export interface MetaQueryResponse {
  data: {
    _meta: {
      deployment: string;
      hasIndexingErrors: boolean;
      block: {
        timestamp: number;
      };
    };
  };
}

export interface CheckResult {
  endpoint: string;
  name: string;
  status: "healthy 🟢" | "unhealthy 🔴";
  errors: string[];
  timestamp: number;
}
