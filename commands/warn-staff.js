const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez mentionner le Staff à warn.')
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
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${member} a été warn pour la raison \"${reason}\" !`)
            .setColor('#00ff00')
            .setTimestamp())
        message.guild.channels.cache.get(config.logs_warn_staff).send(new Discord.MessageEmbed()
            .setAuthor(`[WARN STAFF] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Staff', member, true)
            .addField('Administrateur', message.author, true)
            .addField('Raison', reason, true)
            .setColor('#ff0000')
            .setTimestamp())
    },
    name: 'warn-staff',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de warn un Staff. Il faut avoir la permission \"ADMINISTRATOR\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<@membre> [raison]'
    }
}