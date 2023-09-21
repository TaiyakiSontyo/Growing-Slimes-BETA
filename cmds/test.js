const http = require("http");
const { MessageEmbed } = require("discord.js");
const Keyv = require("keyv");
const player_status = new Keyv(`sqlite://datas/player_data.sqlite`, { table: "status" });
async function splice_status(player_id, start, deleteCount, item1) {
  const status = await player_status.get(player_id);
  status.splice(start, deleteCount, item1);
  await player_status.set(player_id, status);
}
module.exports = {
  name: 'test',
  description: 'test message',
  async execute(message,id) {
    const embed = new MessageEmbed()
      .setTitle('Loading...')
      .setImage('https://media.discordapp.net/attachments/1154331528520806400/1154332794374332446/lv_0_20230921172617.gif')
      .setColor('#0000ff');
    const sentEmbed = await message.channel.send({ embeds: [embed] });
    setTimeout(() => {
      sentEmbed.delete()
      message.reply('ok');
    }, 3000);
  },
};