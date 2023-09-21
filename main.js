const http = require("http");
const {
  Client,
  Intents,
  WebhookClient,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageAttachment,
  Collection,
} = require("discord.js");
const moment = require("moment");
const Keyv = require("keyv");
const util = require("util");
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');

const player_status = new Keyv(`sqlite://datas/player_data.sqlite`, { table: "status" });

const client = new Client({
  partials: ["CHANNEL"],
  intents: new Intents(32767),
  restTimeOffset: -1000
});
const newbutton = (buttondata) => {
  return {
    components: buttondata.map((data) => {
      return {
        custom_id: data.id,
        label: data.label,
        style: data.style || 1,
        url: data.url,
        emoji: data.emoji,
        disabled: data.disabled,
        type: 2,
      };
    }),
    type: 1,
  };
};
const prefix = "gb!"
const admin_list = ["861112893134340106"];
const command_list = ["test"]
const json = require("./command.json")
process.env.TZ = 'Asia/Tokyo'
'use strict';

async function create_data(option, id) {
  if(option == "player"){
    await player_status.set(id, [false,40,10,20,1500,0,0,0,0]);
  }
}

async function delete_data(option, id) {
  if(option == "player"){
    await player_status.delete(id);
  }
}

http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
    response.end("Bot is ready!")
  })
  .listen(3000)

if (process.env.TOKEN == undefined) {
  console.error('tokenが設定されていません！')
  process.exit(0)
}

client.on('ready', async () => {
    client.user.setActivity(`${prefix}help｜自然の豊かさ`, {
      type: 'LISTENING'
    });
  client.user.setStatus("idle");
  console.log(`${client.user.tag} is ready!`);
});

client.on("messageCreate", async message => {
  const arg = message.content.slice(prefix.length).split(/ +/);
  const command = arg.shift().toLowerCase();
  
  if(command_list.includes(command)){
    const p_status = await player_status.get(message.author.id);
    if (!p_status) {
      await create_data("player", message.author.id);
      const e = new MessageEmbed()
      .setTitle("ようこそGODFIELDへ!\nプレイヤーデータを登録したよ!\n再度コマンドを入力してね!")
      .addField("BOTの招待:",">>> **[GODFIELDの招待](https://discord.com/api/oauth2/authorize?client_id=1135584196077813834&permissions=8&scope=bot)**")
      .addField("リンク関連",">>> **[公式鯖](https://discord.gg/qZ2tAVH8Nt)**")
      .setThumbnail("https://media.discordapp.net/attachments/1135596412227301408/1135596519173652570/unnamed.webp")
      return message.member.send({embeds: [e]});
    }
  }
  
  
  if(command == "test"){
    message.reply("ok")
  }

});

client.login(process.env.TOKEN)
