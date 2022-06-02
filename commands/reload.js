require('discord.js');
const config = require('../config.json')

module.exports = {
    run: async (message, client) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        message.channel.send("Le bot reload..."),
            client.destroy(),
            client.login(config.token),
            message.channel.send("Le bot à bien redémarré ! Veuillez cependant attendre 5s avant de le réutiliser (le statut du bot doit se mettre à jour au moins une fois).")
    },
    name: 'reload',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de reload le bot. Il faut avoir la permission \"ADMINISTRATOR\" pour utiliser cette commande !',
        category: "Autre",
        syntax: ''
    }
}