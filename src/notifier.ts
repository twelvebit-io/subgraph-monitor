import axios from "axios";
import { CheckResult } from "./types";

export class TelegramNotifier {
  private botToken: string;
  private chatId: string;

  constructor(botToken: string, chatId: string) {
    this.botToken = botToken;
    this.chatId = chatId;
  }

  async sendNotification(results: CheckResult[]): Promise<void> {
    const unhealthyEndpoints = results.filter(
      (result) => result.status === "unhealthy 🔴"
    );

    if (unhealthyEndpoints.length === 0) {
      return;
    }

    const message = this.formatMessage(unhealthyEndpoints);

    try {
      await axios.post(
        `https://api.telegram.org/bot${this.botToken}/sendMessage`,
        {
          chat_id: this.chatId,
          text: message,
          parse_mode: "Markdown",
        }
      );
    } catch (error) {
      console.error("Failed to send Telegram notification:", error);
    }
  }

  private formatMessage(results: CheckResult[]): string {
    const timestamp = new Date().toISOString();
    let message = `⚠️ *Subgraph Monitor Alert* ⚠️\n\n`;
    message += `*Time*: ${timestamp}\n\n`;

    results.forEach((result) => {
      message += `*${result.name}*\n`;
      message += `Status: ❌ Unhealthy\n`;
      message += `Errors:\n${result.errors
        .map((err) => `- ${err}`)
        .join("\n")}\n\n`;
    });

    return message;
  }
}
