const Discord = require('discord.js')

module.exports = {
    run: async (message) => {
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Salut à toi ${message.author} ! 👋`))
    },
    name: 'bonjour',
    help: {
        description: 'Cette commande permet de vous dire **bonjour** ! 👋. Pas de permisson(s) requise(s).',
        category: "Fun",
        syntax: ''
    }
}