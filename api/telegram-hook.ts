
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
        [{ text: "📖 How It Works", callback_data: "how_it_works" }],
        [{ text: "🛒 View Proxy Plans", callback_data: "view_plans" }],
        [{ text: "🎁 Get Free Proxies", callback_data: "get_free" }],
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

// Get Free Proxies (Dummy Sample)
bot.action("get_free", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `🎁 *Your Free SOCKS5 Proxy:*

\`\`\`
Host: 149.56.23.129
Port: 1080
Username: free_trial
Password: tryitnow
\`\`\`

⚠️ Free proxies are limited and may be slower.

Upgrade for higher speed, privacy, and region control — tap *View Plans* to explore options.`,
    { parse_mode: "Markdown" }
  );
});

// Contact support
bot.action("contact_support", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `📞 *Need Help?*

You can contact our support team directly at:  
👉 @TrevorDev`
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
