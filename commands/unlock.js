const fs = require('fs'),
    Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const channel = message.mentions.channels.first() || message.channel
        if (!client.db.lockedChannels.includes(channel.id)) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Ce salon n\'est pas verrouillé.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        client.db.lockedChannels.splice(client.db.lockedChannels.indexOf(channel.id), 1)
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        const memberRole = channel.guild.roles.cache.find(role => role.name === 'ᘻЄᘻβƦЄ')
        channel.createOverwrite(memberRole, {
            SEND_MESSAGES: null,
            CONNECT: null,
            ADD_REACTIONS: null
        })
        message.channel.send(new Discord.MessageEmbed()
            .setDescription('**Le salon a été déverrouillé !**')
            .setColor('#00ff00')
            .setTimestamp())
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[UNLOCK] ${channel.name}`)
            .addField('Salon', channel, true)
            .addField('Modérateur', message.author, true)
            .setColor('#00ff00')
            .setTimestamp())
    },
    name: 'unlock',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de déverouiller un channel. Il faut avoir la permission \"MANAGE_CHANNELS\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<#channel>'
    }
}