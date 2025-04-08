import { config } from "dotenv";
import { SubgraphMonitor } from "./monitor";
import { TelegramNotifier } from "./notifier";
import { EndpointConfig } from "./types";

// Load environment variables
config();

const ENDPOINTS: EndpointConfig[] = [
  // Analytics Subgraphs
  {
    url: "https://subgraph-api.mantle.xyz/api/public/f077c8d4-0d6c-42d4-9bbd-050948dc5c86/subgraphs/swapsicle/analytics/prod/gn",
    name: "Mantle Analytics",
  },
  {
    url: "https://subgraph-api.mantle.xyz/api/public/f077c8d4-0d6c-42d4-9bbd-050948dc5c86/subgraphs/swapsicle/analytics-testnet/prod/gn",
    name: "Mantle Testnet Analytics",
  },
  {
    url: "https://api.telos.0xgraph.xyz/api/public/f59149ee-c99a-41d0-afe4-1c86170a98b0/subgraphs/swapsicle/analytics/prod/gn",
    name: "Telos Analytics",
  },
  {
    url: "https://api.telos.0xgraph.xyz/api/public/f59149ee-c99a-41d0-afe4-1c86170a98b0/subgraphs/swapsicle/analytics-testnet/prod/gn",
    name: "Telos Testnet Analytics",
  },
  {
    url: "https://api.goldsky.com/api/public/project_clr6mlufzbtuy01vd012wgt5k/subgraphs/swapsicle-analytics-taiko/prod/gn",
    name: "Taiko Analytics",
  },
  {
    url: "https://api.goldsky.com/api/public/project_clr6mlufzbtuy01vd012wgt5k/subgraphs/swapsicle-analytics-taiko-hekla/prod/gn",
    name: "Taiko Testnet Analytics",
  },

  // Farms Subgraphs
  {
    url: "https://subgraph-api.mantle.xyz/api/public/f077c8d4-0d6c-42d4-9bbd-050948dc5c86/subgraphs/cryptoalgebra/farms/-/gn",
    name: "Mantle Farms",
  },
  {
    url: "https://subgraph-api.mantle.xyz/api/public/f077c8d4-0d6c-42d4-9bbd-050948dc5c86/subgraphs/swapsicle/farms-testnet/prod/gn",
    name: "Mantle Testnet Farms",
  },
  {
    url: "https://api.telos.0xgraph.xyz/api/public/f59149ee-c99a-41d0-afe4-1c86170a98b0/subgraphs/swapsicle/farms/prod/gn",
    name: "Telos Farms",
  },
  {
    url: "https://api.telos.0xgraph.xyz/api/public/f59149ee-c99a-41d0-afe4-1c86170a98b0/subgraphs/swapsicle/farms-testnet/prod/gn",
    name: "Telos Testnet Farms",
  },
  {
    url: "https://api.goldsky.com/api/public/project_clr6mlufzbtuy01vd012wgt5k/subgraphs/swapsicle-farms-taiko/prod/gn",
    name: "Taiko Farms",
  },
  {
    url: "https://api.goldsky.com/api/public/project_clr6mlufzbtuy01vd012wgt5k/subgraphs/swapsicle-farms-taiko-hekla/prod/gn",
    name: "Taiko Testnet Farms",
  },

  // Blocks Subgraphs
  {
    url: "https://subgraph-api.mantle.xyz/api/public/f077c8d4-0d6c-42d4-9bbd-050948dc5c86/subgraphs/swapsicle/blocks/prod/gn",
    name: "Mantle Blocks",
  },
  {
    url: "https://subgraph-api.mantle.xyz/api/public/f077c8d4-0d6c-42d4-9bbd-050948dc5c86/subgraphs/swapsicle/blocks-testnet/prod/gn",
    name: "Mantle Testnet Blocks",
  },
  {
    url: "https://api.telos.0xgraph.xyz/api/public/f59149ee-c99a-41d0-afe4-1c86170a98b0/subgraphs/swapsicle/blocks/prod/gn",
    name: "Telos Blocks",
  },
  {
    url: "https://api.telos.0xgraph.xyz/api/public/f59149ee-c99a-41d0-afe4-1c86170a98b0/subgraphs/swapsicle/blocks-testnet/prod/gn",
    name: "Telos Testnet Blocks",
  },
  {
    url: "https://api.goldsky.com/api/public/project_clr6mlufzbtuy01vd012wgt5k/subgraphs/swapsicle-blocks-taiko/prod/gn",
    name: "Taiko Blocks",
  },
  {
    url: "https://api.goldsky.com/api/public/project_clr6mlufzbtuy01vd012wgt5k/subgraphs/swapsicle-blocks-taiko-hekla/prod/gn",
    name: "Taiko Testnet Blocks",
  },

  // Ice Token Subgraphs
  {
    url: "https://subgraph-api.mantle.xyz/api/public/f077c8d4-0d6c-42d4-9bbd-050948dc5c86/subgraphs/swapsicle/icetoken/prod/gn",
    name: "Mantle Ice Token",
  },
  {
    url: "https://subgraph-api.mantle.xyz/api/public/f077c8d4-0d6c-42d4-9bbd-050948dc5c86/subgraphs/swapsicle/icetoken-testnet/prod/gn",
    name: "Mantle Testnet Ice Token",
  },
  {
    url: "https://api.telos.0xgraph.xyz/api/public/f59149ee-c99a-41d0-afe4-1c86170a98b0/subgraphs/swapsicle/icetoken/prod/gn",
    name: "Telos Ice Token",
  },
  {
    url: "https://api.telos.0xgraph.xyz/api/public/f59149ee-c99a-41d0-afe4-1c86170a98b0/subgraphs/swapsicle/icetoken-testnet/prod/gn",
    name: "Telos Testnet Ice Token",
  },
  {
    url: "https://api.goldsky.com/api/public/project_clr6mlufzbtuy01vd012wgt5k/subgraphs/swapsicle-icetoken-taiko/prod/gn",
    name: "Taiko Ice Token",
  },
  {
    url: "https://api.goldsky.com/api/public/project_clr6mlufzbtuy01vd012wgt5k/subgraphs/swapsicle-icetoken-taiko-hekla/prod/gn",
    name: "Taiko Testnet Ice Token",
  },
];

export async function main() {
  const monitor = new SubgraphMonitor(ENDPOINTS);
  const notifier = new TelegramNotifier(
    process.env.TELEGRAM_BOT_TOKEN || "",
    process.env.TELEGRAM_CHAT_ID || ""
  );

  try {
    console.log("Checking endpoints...");
    const results = await monitor.checkAll();

    

    // Log results for local debugging
    results.forEach((result) => {
      console.log(`\nEndpoint: ${result.name}`);
      console.log(`Status: ${result.status}`);
      if (result.errors.length > 0) {
        console.log("Errors:", result.errors);
      } 
    });

    if (results.some((result) => result.errors.length > 0)) {
      console.log("\nWarning: Some endpoints are unhealthy 🔴");
    } else {
      console.log("\nAll endpoints are healthy 🟢");
    }

    

    await notifier.sendNotification(results);
    console.log("\nNotifications sent (if any unhealthy endpoints)");
  } catch (error) {
    console.error("Error in monitoring:", error);
  }
}

// If running directly (not in GitHub Actions or imported)
if (require.main === module) {
  main().catch(console.error);
}
