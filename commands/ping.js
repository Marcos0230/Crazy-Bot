const Discord = require('discord.js')

module.exports = {
    run: async (message) => {
        var start=Date.now();message.channel.send("Pinging...").then(m=>{m.edit("🏓 Pong : "+(Date.now()-start)+"ms")})
    },
    name: 'ping',
    help: {
        description: 'Cette commande permet de connaître le ping du bot en ms.',
        category: "Utilitaire",
        syntax: ''
    }
}