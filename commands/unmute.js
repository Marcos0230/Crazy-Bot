const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez mentionner le membre à unmute.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas unmute ce membre.')
        if (!member.manageable) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Je ne pas unmute ce membre !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Il n\'y a pas de muteRole ! Je ne peux donc pas unmute cette personne.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        await member.roles.remove(muteRole)
        message.mentions.members.first().send(new Discord.MessageEmbed()
            .setAuthor(`[UNMUTE] sur le serveur ${message.guild.name}`, message.guild.iconURL())
            .addField('Par le Modérateur', message.author, true)
            .addField('Pour la Raison', reason, true)
            .setColor('#00ff00')
            .setTimestamp())
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${member} a été unmute`)
            .setColor('#00ff00')
            .setTimestamp())
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[UNMUTE] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .setColor('#00ff00')
            .setTimestamp())
    },
    name: 'unmute',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de unmute un utilisateur. Il faut avoir la permission \"BMANAGE_MESSAGES\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<@membre>'
    }
}