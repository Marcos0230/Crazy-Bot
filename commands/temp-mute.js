const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration'),
    Discord = require('discord.js'),
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
            .setDescription('Veuillez mentionner le membre à mute temporairement.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Je ne peux pas mute temporairement le leader suprême !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail('`https://media.discordapp.net/attachments/909742401210433536/988910223790075934/antoine-daniel-wtc.gif`'))
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Votre rôle n\'est pas assez haut pour mute temporairement ce membre')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (!member.manageable) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Je ne pas mute temporairement ce membre !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez indiquer une durée valide.\n\n10 minutes = 10m ; 1 heure = 1h ; etc.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie.'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        await member.roles.add(muteRole)
        message.mentions.members.first().send(new Discord.MessageEmbed()
            .setAuthor(`[MUTE] sur le serveur ${message.guild.name}`, message.guild.iconURL())
            .addField('Par le Modérateur', message.author, true)
            .addField('Pour la Raison', reason, true)
            .addField('Durée', humanizeDuration(duration, {language: 'fr'}), true)
            .setColor('#ff0000')
            .setTimestamp())
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${member} a été mute pendant ${humanizeDuration(duration, {language: 'fr'})} !`)
            .setColor('#00ff00')
            .setTimestamp())
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[MUTE] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .addField('Durée', humanizeDuration(duration, {language: 'fr'}), true)
            .setColor('#ff0000')
            .setTimestamp())
        setTimeout(() => {
            if (member.deleted || !member.manageable) return
            member.roles.remove(muteRole)
            message.channel.send(new Discord.MessageEmbed()
                .setDescription(`${member} a été unmute !`)
                .setColor('#00ff00')
                .setTimestamp())
            message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
                .setAuthor(`[UNMUTE] ${member.user.tag}`, member.user.displayAvatarURL())
                .addField('Utilisateur', member, true)
                .addField('Raison', 'Unmute automatique', true)
                .setColor('#00ff00')
                .setTimestamp())
            message.mentions.members.first().send(new Discord.MessageEmbed()
                .setAuthor(`[UNMUTE] sur le serveur ${message.guild.name}`, message.guild.iconURL())
                .addField('Par le Modérateur', message.author, true)
                .addField('Pour la Raison', 'Unmute automatique', true)
                .setColor('#00ff00')
                .setTimestamp())
        }, duration)
    },
    name: 'temp-mute',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de mute temporairement un utilisateur. Il faut avoir la permission \"MANAGE_MEMBERS\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<@membre> [raison] <durée>'
    }
}