import { VercelRequest, VercelResponse } from "@vercel/node";
import { Telegraf } from "telegraf";

// Env variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const SECRET_HASH = "32e58fbahey833349df3383dee9132e180";
//ds

const bot = new Telegraf(BOT_TOKEN);

// /start handler
bot.start(async (ctx) => {
  const reply = `
👋 *Welcome to Turbo Socks Bot!*

Protect your browsing and stay private with premium SOCKS5 proxies.

Please choose an option below to get started:
`;

  await ctx.reply(reply, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "🛒 View Proxy Plans", callback_data: "view_plans" }],
        [{ text: "📖 How It Works", callback_data: "how_it_works" }],
        [{ text: "📞 Contact Support", callback_data: "contact_support" }],
      ],
    },
  });
});

// View plans
bot.action("view_plans", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `💼 *Proxy Plans Available*:

🔹 *Basic Plan* — \$5/month  
   5 proxies · 1 country

🔹 *Pro Plan* — \$10/month  
   15 proxies · Multi-region

🔹 *Elite Plan* — \$20/month  
   50 proxies · Global rotation

All plans come with setup guides and 24/7 support.
`,
    { parse_mode: "Markdown" }
  );
});

// How it works
bot.action("how_it_works", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `🔧 *How It Works*:

1. Choose a plan
2. Get your SOCKS5 proxy credentials
3. Configure them in your apps, browser, or device
4. Browse securely and without restrictions

Setup instructions are sent immediately after signup.`,
    { parse_mode: "Markdown" }
  );
});

// Contact support
bot.action("contact_support", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `📞 *Need Help?*

You can contact our support team directly at:  
👉 @trever_v9`
  );
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
