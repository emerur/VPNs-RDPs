import { VercelRequest, VercelResponse } from "@vercel/node";
import {  NextResponse } from "next/server"
import { Telegraf } from "telegraf";

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN; // Replace with your bot token

// Initialize the bot
const bot = new Telegraf(BOT_TOKEN);
// /start handler
export async function handleStartCommand(ctx) {
  const COMMAND = "/start";
  const channelUrl = "t.me/nitrovpns0";
  const targetUrl = "t.me/+iymnXSB4V9YyYTFk";

// Welcome message with Markdown formatting
  const reply = `
[Checkmate is just the opening move. Ready to play bigger game? Join the premium channel for strategic insights/methods on success and style.

Start earning today with our clear, step-by-step instructions.

Seize this opportunity to boost your income and take control of your financial future.](${targetUrl})
`;

  try {
    await ctx.reply(reply, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🌐 Join Free VPNs/Proxies (Socks5 & Socks4)",
              url: channelUrl,
            },
          ],
        ],
      },
    });
    console.log(`Reply to ${COMMAND} command sent successfully.`);
  } catch (error) {
    console.error(`Something went wrong with the ${COMMAND} command:`, error);
  }
}
export async function sendImageCommand(ctx) {
  const media = [
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/emerur/VPNs-RDPs/main/photo_2025-10-27_10-14-12.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/emerur/VPNs-RDPs/main/photo_2025-10-27_10-14-58.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/emerur/VPNs-RDPs/main/photo_2025-10-27_10-15-14.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/emerur/VPNs-RDPs/main/photo_2025-10-27_10-15-21.jpg",
    },
  ];
  // Send image first
  await ctx.replyWithMediaGroup(media);
}

// Register the /start command handler
bot.command("start", async (ctx) => {
  // Send image first
  await sendImageCommand(ctx);
  await handleStartCommand(ctx);
});

// API route handler
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body, query } = req;

    // Set webhook if requested
    if (query.setWebhook === "true") {
     const webhookUrl = `${process.env.WEBHOOK_URL}`
    await bot.telegram.setWebhook(webhookUrl)

    return res.status(200).send("OK");
    }

    // Handle incoming updates from Telegram  
      await bot.handleUpdate(body);
  
    return res.status(200).send("OK");
    })
  } catch (error) {
    return res.json({ error: "Internal server error" }, { status: 500 })
  }

  // Acknowledge the request with Telegram
  // res.status(200).send("OK");
};
