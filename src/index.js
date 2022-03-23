// Discord Bot using discord.js
import { Client, Intents, MessageEmbed } from "discord.js";
import "dotenv/config";

// Create new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Emmited when client becomes ready to start doing its thing
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Emitted when a message is deleted
client.on("messageDelete", (deletedMessage) => {
  console.log("Deleted Message: ", deletedMessage);
});

// Emitted when a message is edited
client.on("messageUpdate", (oldMessage, newMessage) => {
  console.log("Old Message:", oldMessage);
  console.log("New Message", newMessage);
});

// Establish WebSocket connection to Discord
client.login(process.env.BOT_CLIENT_TOKEN);
