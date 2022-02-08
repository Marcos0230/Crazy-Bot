const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
        .setColor('#ff0000')
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/attachments/738864387019767921/821457688172167198/Hnet.com-image.gif'))
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('Veuillez mentionner le membre à unban.')
        .setColor('#ff0000')
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/attachments/738864387019767921/821457688172167198/Hnet.com-image.gif'))
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas unban ce membre.')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        await message.mentions.members.first().send(new Discord.MessageEmbed()
        .setAuthor(`[UNBAN] sur le serveur ${message.guild.name}`, message.guild.iconURL())
        .addField('Par le Modérateur', message.author, true)
        .addField('Pour la Raison', reason, true)
        .addField('Durée', humanizeDuration(duration, {language: 'fr'}), true)
        .setColor('#00ff00')
        .setTimestamp())
        await message.guild.members.unban(member)
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${member.user.tag} a été débanni(e) !`)
            .setColor('#00ff00')
            .setTimestamp())
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[UNBAN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Raison', reason, true)
            .setColor('#00ff00')
            .setTimestamp())
    },
    name: 'unban',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de unban un utilisateur. Il faut avoir la permission \"BAN_MEMBERS\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<@membre> [raison]'
    }
}