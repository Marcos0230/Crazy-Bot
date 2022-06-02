const Discord = require('discord.js')
const moment = require('moment')
const config = require('../config.json')

moment.locale('fr')

module.exports = {
    run: async (message, args, client) => {
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez mentionner le membre dont vous voulez voir les warns')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (!client.db.warns[member.id]) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Ce membre n\'a aucun warn')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        await message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**Total de warns :** ${client.db.warns[member.id].length}\n\n__**10 derniers warns**__\n\n${client.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`)
            .setColor('#ffff00')
            .setTimestamp())
    },
    name: 'infractions',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de voir les warns d\'un utilisateur. Pas de permission requise.',
        category: "Modération",
        syntax: '<@membre>'
    }
}