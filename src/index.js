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
  // Find the channel name "logs"
  const logsChannel = deletedMessage.guild.channels.cache.find(
    (channel) => channel.name === "logs"
  );

  // If the bot cannot find the "logs" channel, tell the channel
  if (!logsChannel) {
    return deletedMessage.channel.send(
      "I need the #logs channel to post this."
    );
  }

  let embed = new MessageEmbed()
    .setColor("RED")
    .setTitle("Message Deleted")
    .addFields(
      {
        name: "User: ",
        value: deletedMessage.author.tag,
      },
      {
        name: "User ID: ",
        value: deletedMessage.author.id,
      },
      { name: "Message Content: ", value: deletedMessage.content },
      { name: "Channel: ", value: `<#${deletedMessage.channel.id}>` }
    )
    .setTimestamp(deletedMessage.createdTimestamp);

  logsChannel.send({ embeds: [embed] });
});

// Emitted when a message is edited
client.on("messageUpdate", (oldMessage, newMessage) => {
  // Find the channel name "logs"
  const logsChannel = newMessage.guild.channels.cache.find(
    (channel) => channel.name === "logs"
  );

  // If the bot cannot find the "logs" channel, tell the channel
  if (!logsChannel) {
    return deletedMessage.channel.send(
      "I need the #logs channel to post this."
    );
  }

  if (oldMessage.content !== newMessage.content) {
    let embed = new MessageEmbed()
      .setColor("#A7DB4B")
      .setTitle("Message Updated")
      .addFields(
        {
          name: "User: ",
          value: oldMessage.author.tag,
        },
        {
          name: "User ID: ",
          value: oldMessage.author.id,
        },
        { name: "Original Message: ", value: oldMessage.content },
        { name: "Updated Message: ", value: newMessage.content },
        { name: "Channel: ", value: `<#${oldMessage.channel.id}>` }
      )
      .setTimestamp(newMessage.editedTimestamp);

    console.log(embed);

    logsChannel.send({ embeds: [embed] });
  }
});

// Establish WebSocket connection to Discord
client.login(process.env.BOT_CLIENT_TOKEN);
