const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration'),
    Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez mentionner le membre à bannir temporairement.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Je ne peux pas bannir temporairement le leader suprême !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail('`https://media.discordapp.net/attachments/909742401210433536/988910223790075934/antoine-daniel-wtc.gif`'))
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Votre rôle n\'est pas assez haut pour bannir temporairement ce membre')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (!member.bannable) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Je ne pas bannir temporairement ce membre !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez indiquer une durée valide.\n\n10 minutes = 10m ; 1 heure = 1h ; etc.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        await message.mentions.members.first().send(new Discord.MessageEmbed()
            .setAuthor(`[BAN] sur le serveur ${message.guild.name}`, message.guild.iconURL())
            .addField('Par le Modérateur', message.author, true)
            .addField('Pour la Raison', reason, true)
            .addField('Durée', humanizeDuration(duration, {language: 'fr'}), true)
            .setColor('#ff0000')
            .setTimestamp())
        await member.ban({reason})
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${member.user.tag} a été banni(e) pendant ${humanizeDuration(duration, {language: 'fr'})} !`)
            .setColor('#00ff00')
            .setTimestamp())
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[BAN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .addField('Durée', humanizeDuration(duration, {language: 'fr'}), true)
            .setColor('#ff0000')
            .setTimestamp())
        setTimeout(() => {
            message.guild.members.unban(member)
            message.channel.send(new Discord.MessageEmbed()
                .setDescription(`${member.user.tag} a été débanni(e) !`)
                .setColor('#00ff00')
                .setTimestamp())
            message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
                .setAuthor(`[UNBAN] ${member.user.tag}`, member.user.displayAvatarURL())
                .addField('Utilisateur', member, true)
                .addField('Raison', 'Unban automatique', true)
                .setColor('#00ff00')
                .setTimestamp())
        }, duration)
    },
    name: 'temp-ban',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de bannir temporairement un utilisateur. Il faut avoir la permission \"BAN_MEMBERS\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<@membre> [raison] <durée>'
    }
}