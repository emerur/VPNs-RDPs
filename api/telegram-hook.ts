import { VercelRequest, VercelResponse } from "@vercel/node";
import { Telegraf } from "telegraf";

// Env variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const SECRET_HASH = "32e58fbahey833349df3383dee9132e180";
//ds

const bot = new Telegraf(BOT_TOKEN);

// /start handler
export async function handleStartCommand(ctx) {
  const COMMAND = "/start";
  const channelUrl = "t.me/hq_proxies";
  const targetUrl = "t.me/+mu8JZaGlWG80YWFk";

  // Welcome message with Markdown formatting
  const reply = `
  🚀 FREE MONEY-MAKING METHODS + UNLIMITED PROXIES! 🚀

💸 Want to start making real money online?
We reveal step-by-step methods anyone can use — no tricks, no paywalls, just 100% free legit strategies to help you earn from your phone or PC.
✅ Bank Log Cashout & CC Updates Daily
✅ Free Walkthroughs & Giveaways
✅ Free Proxies & Tools
✅ No skills needed
✅ Results from day one (if you’re serious)

🛡 And to keep you anonymous while you earn:
✔️ 30M+ Residential Socks5 IPs
✔️ 1M+ Mobile 4G/LTE Proxies
✔️ 0 Fraud Score – Fully Undetectable
✔️ Sticky & Rotating Sessions
✔️ Worldwide Targeting

🎯 Start earning smarter, not harder.
⚡️ Everything is FREE – No signups, no trials.

👇 Tap a button to unlock everything:
🔗 [Tap to Join Now](${targetUrl})
`;

  try {
    await ctx.reply(reply, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔗 Join Channel", url: channelUrl }],
          [
            {
              text: "🌐 Get Free Proxies",
              url: channelUrl,
            },
          ],
          [{ text: "🎓 Learn to Earn", url: targetUrl }],
        ],
      },
    });
    console.log(`Reply to ${COMMAND} command sent successfully.`);
  } catch (error) {
    console.error(`Something went wrong with the ${COMMAND} command:`, error);
  }
}
export async function sendImageCommand(ctx) {
  // Send image first
  await ctx.replyWithPhoto(
    {
      url: "https://i.postimg.cc/hP1bDyLQ/photo-2025-06-19-19-44-19.jpg",
    }, // or use { source: 'path/to/image.jpg' }
    { caption: "🔥 FREE MONEY-MAKING METHODS🔥" }
  );
}

// Register the /start command handler
bot.command("start", async (ctx) => {
  // Send image first
  await sendImageCommand(ctx);
  await handleStartCommand(ctx);
});

// Webhook handler
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body, query } = req;

    // Webhook setup
    if (query.setWebhook === "true") {
      const webhookUrl = `${process.env.VERCEL_URL}/api/telegram-hook?secret_hash=${SECRET_HASH}`;
      const isSet = await bot.telegram.setWebhook(webhookUrl);
      console.log(`Webhook set to ${webhookUrl}: ${isSet}`);
    }

    // Process updates
    if (query.secret_hash === SECRET_HASH) {
      await bot.handleUpdate(body);
    }
  } catch (error) {
    console.error("Telegram Bot Error:", error.toString());
  }

  res.status(200).send("OK");
};
