const http = require("http");
const { MessageEmbed } = require("discord.js");
const Keyv = require("keyv");
const player_status = new Keyv(`sqlite://datas/player_data.sqlite`, { table: "status" });
async function splice_status(player_id, start, deleteCount, item1) {
  const status = await player_status.get(player_id);
  status.splice(start, deleteCount, item1);
  await player_status.set(player_id, status);
}
const prefix = ".gb"
module.exports = {
  name: 'test',
  description: 'test message',
  async execute(message,id) {
    let times = [];
    const args = message.content.slice(prefix.length + 'test'.length).trim().split(/ +/);
    if (args == "fast") {
      const ran = Math.floor(Math.random() * (30 - 10+ 1)) + 10;
      times.push(ran)
    }else if(args == "low"){
      const ran = Math.floor(Math.random() * (120 - 20 + 1)) + 20;
      times.push(ran)
    }else{
      const ran = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
      times.push(ran)
    }
    
    const tn = Math.floor(times / 10) * 10;
    const totalTime = times;
    let currentTime = 0;
    const progressBarEmbed = new MessageEmbed()
      .setColor('#000000')
      .setTitle('テストを実行中です')
      .setDescription('テスト中です...')
      .setFooter(`約${tn}秒で完了します`);

    const progressBarMessage = await message.channel.send({ embeds: [progressBarEmbed] });
    
    const barLength = 20;
    
    const progressBarInterval = setInterval(() => {
      currentTime++;
      const progress = (currentTime / totalTime);
      const progressBar = '='.repeat(Math.floor(barLength * progress)) + ' '.repeat(barLength - Math.floor(barLength * progress));

      progressBarEmbed.setDescription(`\`\`\`[${progressBar}] ${Math.floor(progress * 100)}%\`\`\``);

      progressBarMessage.edit({ embeds: [progressBarEmbed] });

      if (currentTime >= totalTime) {
        clearInterval(progressBarInterval);
        progressBarEmbed.setDescription('```diff\n+ このbotは正常です。```');
        progressBarMessage.edit({ embeds: [progressBarEmbed] });
      }
    }, 1000);
  },
};
