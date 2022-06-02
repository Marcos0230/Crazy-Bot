const fs = require('fs'),
    Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez mentionner le membre à unwarn.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (!client.db.warns[member.id]) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Ce membre n\'a aucun warn.')
            .setColor('#ff0000')
            .setTimestamp())
        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Ce warn n\'existe pas.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const {reason} = client.db.warns[member.id].splice(warnIndex, 1)[0]
        if (!client.db.warns[member.id].length) delete client.db.warns[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.mentions.members.first().send(new Discord.MessageEmbed()
            .setAuthor(`[UNWARN] sur le serveur ${message.guild.name}`, message.guild.iconURL())
            .addField('Par le Modérateur', message.author, true)
            .addField('La Raison était', reason, true)
            .setColor('#00ff00')
            .setTimestamp())
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${member} a été unwarn ! La raison du warn était \"${reason}\".`)
            .setColor('#ff0000')
            .setTimestamp())
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[UNWARN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Warn supprimé', reason, true)
            .setColor('#00ff00')
            .setTimestamp())
    },
    name: 'unwarn',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de unwarn un utilisateur. Il faut avoir la permission \"MANAGE_MESSAGES\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<@membre> <n° du warn>'
    }
}