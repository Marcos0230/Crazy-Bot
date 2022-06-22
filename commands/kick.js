const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez mentionner le membre à exclure !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (member.id === message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Je ne peux pas kick le leader suprême !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail('`https://media.discordapp.net/attachments/909742401210433536/988910223790075934/antoine-daniel-wtc.gif`'))
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Votre rôle n\'est pas assez haut pour kick ce membre')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (!member.kickable) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Je ne pas kick ce membre !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await message.mentions.members.first().send(new Discord.MessageEmbed()
            .setAuthor(`[KICK] sur le serveur ${message.guild.name}`, message.guild.iconURL())
            .addField('Par le Modérateur', message.author, true)
            .addField('Pour la Raison', reason, true)
            .setColor('#ff0000')
            .setTimestamp())
        await member.kick(reason)
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${member.user.tag} a été exclu(e)`)
            .setColor('#00ff00')
            .setTimestamp())
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[KICK] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .setColor('#00ff00')
            .setTimestamp())
    },
    name: 'kick',
    guildOnly: true,
    help: {
        description: 'Cette commande permet d\'expulser un utiliateur. Il faut avoir la permission \"KICK_MEMBERS\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<@membre> [raison]'
    }
}