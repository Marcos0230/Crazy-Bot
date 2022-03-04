const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        /*if (!message.author.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
        .setColor('#ff0000')
        .setTimestamp()
            .setThumbnail(config.gif)
        .setThumbnail(config.gif))
        const member = args[0]
        if (!member) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('Veuillez donner l\'id de l\'utilisateur à unban.')
        .setColor('#ff0000')
        .setTimestamp()
            .setThumbnail(config.gif)
        .setThumbnail(config.gif))
        if (message.author.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas unban ce membre.')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        try {
            message.guild.fetchBans().then( bans => {
                message.guild.members.unban(member)
            })
            await message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${member.user.tag} a été débanni(e) !`)
            .setColor('#00ff00')
            .setTimestamp())
            message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[UNBAN] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Raison', reason, true)
            .setColor('#00ff00')
            .setTimestamp())
        } catch (err) {
            message.channel.send('Une erreur est survenue lors du unban de l\'utilisateur : ' + err)
        }*/
        message.reply('Commande en développement !')
    },
    name: 'unban',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de unban un utilisateur. Il faut avoir la permission \"BAN_MEMBERS\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<@membre> [raison]'
    }
}