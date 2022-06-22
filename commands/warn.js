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
            .setDescription('Veuillez mentionner le membre à warn.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Je ne peux pas warn le leader suprême !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail('`https://media.discordapp.net/attachments/909742401210433536/988910223790075934/antoine-daniel-wtc.gif`'))
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Votre rôle n\'est pas assez haut pour warn ce membre')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez indiquer une raison !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (!client.db.warns[member.id]) client.db.warns[member.id] = []
        client.db.warns[member.id].unshift({
            reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.mentions.members.first().send(new Discord.MessageEmbed()
            .setAuthor(`[WARN] sur le serveur ${message.guild.name}`, message.guild.iconURL())
            .addField('Par le Modérateur', message.author, true)
            .addField('Pour la Raison', reason, true)
            .setColor('#ff0000')
            .setTimestamp())
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${member} a été warn pour la raison \"${reason}\" !`)
            .setColor('#00ff00')
            .setTimestamp())
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[WARN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .setColor('#ff0000')
            .setTimestamp())
    },
    name: 'warn',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de warn un utilisateur. Il faut avoir la permission \"MANAGE_MESSAGES\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<@membre> [raison]'
    }
}