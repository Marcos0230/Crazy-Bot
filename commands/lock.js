const fs = require('fs'),
    Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
        .setColor('#ff0000')
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/attachments/738864387019767921/821457688172167198/Hnet.com-image.gif'))
        const channel = message.mentions.channels.first() || message.channel
        if (client.db.lockedChannels.includes(channel.id)) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('Ce salon est déjà verouillé.')
        .setColor('#ff0000')
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/attachments/738864387019767921/821457688172167198/Hnet.com-image.gif'))
        client.db.lockedChannels.push(channel.id)
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        const memberRole = channel.guild.roles.cache.find(role => role.name === '「👥」Membres')
        channel.createOverwrite(memberRole, {
            SEND_MESSAGES: false,
            CONNECT: false,
            ADD_REACTIONS: false
        })
        message.channel.send(new Discord.MessageEmbed()
        .setDescription('**Le salon a été verouillé !**')
        .setColor('#00ff00')
        .setTimestamp())
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[LOCK] ${channel.name}`)
            .addField('Salon', channel, true)
            .addField('Modérateur', message.author, true)
            .setColor('#00ff00')
            .setTimestamp())
    },
    name: 'lock',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de verouiller un channel. Il faut avoir la permission \"MANAGE_CHANNELS\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<#channel>'
    }
}