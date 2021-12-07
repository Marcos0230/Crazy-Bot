const Discord = require('discord.js')

module.exports = {
    run: async (message) => {
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`commande en dev`))
    },
    name: 'fight',
    help: {
        description: 'commande en dev ! 👋. Pas de permisson(s) requise(s).',
        category: "Fun",
        syntax: ''
    }
}