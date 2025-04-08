import { main } from "./index";

const FIVE_MINUTES = 5 * 60 * 1000; // 5 minutes in milliseconds

async function runMonitor() {
  console.log(`[${new Date().toISOString()}] Running monitor check...`);
  try {
    await main();
    console.log("Monitor check completed successfully");
  } catch (error) {
    console.error("Error running monitor:", error);
  }
}

// Run immediately on start
runMonitor();

// Then run every 5 minutes
setInterval(runMonitor, FIVE_MINUTES);

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\nGracefully shutting down...");
  process.exit(0);
});
