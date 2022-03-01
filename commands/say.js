const Discord = require('discord.js')
const config = require('../config.json')
 
module.exports = {
    run: (message, args) => {
        if (!message.author.id === ('588381876989853697') || !message.author.id === ('557500561277059073')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
        .setColor('#ff0000')
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/attachments/738864387019767921/821457688172167198/Hnet.com-image.gif'))
        if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('Veuillez indiquer le texte à envoyer.')
        .setColor('#ff0000')
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/attachments/738864387019767921/821457688172167198/Hnet.com-image.gif'))
        message.delete()
        message.channel.send(message.content.trim().slice(`${config.prefix}say`.length) + ` ||*[message envoyé par ${message.author.tag}]*||`)
    },
    name: 'say',
    guildOnly: true,
    help: {
        description: 'Cette commande permet d\'envoyer du texte via le bot. Afin d\'éviter les abus, il faut avoir la permission \"MANAGE_GUILD\" pour utiliser cette commande !',
        category: "Autre",
        syntax: ''
    }
}