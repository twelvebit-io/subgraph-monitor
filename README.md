# Subgraph Monitor

A GitHub Actions-based monitoring system for GraphQL subgraph endpoints. This tool checks the health and sync status of specified subgraph endpoints every 5 minutes and sends notifications via Telegram when issues are detected.

## Features

- Monitors multiple subgraph endpoints
- Checks for:
  - Endpoint availability
  - Indexing errors
  - Sync status (within 12 hours of current time)
  - Deployment existence
- Sends notifications via Telegram for unhealthy endpoints
- Runs every 5 minutes using GitHub Actions

## Setup

1. Fork this repository

2. Set up Telegram notifications:

   - Create a Telegram bot using [@BotFather](https://t.me/botfather)
   - Get your bot token
   - Create a group or channel and add your bot
   - Get the chat ID (you can use [@userinfobot](https://t.me/userinfobot))

3. Add GitHub Secrets:

   - Go to your repository's Settings > Secrets and Variables > Actions
   - Add the following secrets:
     - `TELEGRAM_BOT_TOKEN`: Your Telegram bot token
     - `TELEGRAM_CHAT_ID`: Your Telegram chat ID

4. Configure endpoints:
   - Edit `src/index.ts` and modify the `ENDPOINTS` array to include your subgraph endpoints

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file:

   ```
   TELEGRAM_BOT_TOKEN=your_bot_token
   TELEGRAM_CHAT_ID=your_chat_id
   ```

3. Build and run:
   ```bash
   npm run build
   npm start
   ```

## Adding More Endpoints

To monitor additional endpoints, add them to the `ENDPOINTS` array in `src/index.ts`:

```typescript
const ENDPOINTS: EndpointConfig[] = [
  {
    url: "https://your-subgraph-endpoint.com",
    name: "Subgraph Name",
  },
  // Add more endpoints here
];
```

## License

MIT
