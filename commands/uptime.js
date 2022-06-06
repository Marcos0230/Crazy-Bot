const moment = require("moment");
require("moment-duration-format");
require("discord.js");
const startTime = Date.now()

module.exports = {
    run: async (message) => {
        const uptime = Date.now() - startTime
        message.channel.send(moment.duration(uptime).format(" D [days], H [hrs], m [mins], s [secs]"))
    },
    name: 'uptime',
    help: {
        description: 'Cette commande permet de connaître le uptime du bot. Pas de permisson(s) requise(s).',
        category: "Utilitaire",
        syntax: ''
    }
}