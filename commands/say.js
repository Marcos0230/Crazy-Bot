const Discord = require('discord.js')
const config = require('../config.json')
 
module.exports = {
    run: (message, args) => {
        if (!message.author.id === ('588381876989853697')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
        .setColor('#ff0000')
        .setTimestamp()
        .setThumbnail(config.gif))
        if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('Veuillez indiquer le texte à envoyer.')
        .setColor('#ff0000')
        .setTimestamp()
        .setThumbnail(config.gif))
        message.delete()
        message.channel.send(message.content.trim().slice(`${config.prefix}say`.length))
    },
    name: 'say',
    guildOnly: true,
    help: {
        description: 'Commande privée qui permet à LeGarsFou d\'envoyer des messages à travers moi \(CrazyBot\)',
        category: "Autre",
        syntax: '\<texte à dire\>'
    }
}