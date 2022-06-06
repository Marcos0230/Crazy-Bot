const moment = require("moment");
require("moment-duration-format");
require("discord.js");
const Discord = require("discord.js");
const startTime = Date.now()

module.exports = {
    run: async (message) => {
        const uptime = Date.now() - startTime
        await message.channel.send(new Discord.MessageEmbed()
            .setTitle("Uptime du bot...")
            .setDescription("Le bot est online depuis : " + moment.duration(uptime).format(" D [days], H [hrs], m [mins], s [secs]"))
            .setColor('#30d5c8')
            .setTimestamp())
    },
    name: 'uptime',
    help: {
        description: 'Cette commande permet de connaître le uptime du bot. Pas de permisson(s) requise(s).',
        category: "Utilitaire",
        syntax: ''
    }
}