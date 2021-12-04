const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
            .setColor('#ff0000')
            .setTimestamp())
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez mentionner le membre à bannir.')
            .setColor('#ff0000')
            .setTimestamp())
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Je ne pas bannir le proprétaire du serveur !')
            .setColor('#ff0000')
            .setTimestamp())
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas Bannir ce membre.')
        if (!member.bannable) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Je ne pas bannir ce membre !')
            .setColor('#ff0000')
            .setTimestamp())
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await member.ban({reason})
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${member.user.tag} a été banni(e)`)
            .setColor('#00ff00')
            .setTimestamp())
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[BAN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .addField('Durée', '∞', true)
            .setColor('#00ff00')
            .setTimestamp())
    },
    name: 'ban',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de bannir un utilisateur. Il faut avoir la permission \"BAN_MEMBERS\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<@membre> [raison]'
    }
}