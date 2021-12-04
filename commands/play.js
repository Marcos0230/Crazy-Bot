const Discord = require('discord.js')

module.exports = {
    run: (message, args) => {
        message.reply('Commande en développement')
    },
    name: 'play',
    guildOnly: true,
    help: {
        description: 'Permet de jouer une musique dans un salon vocal. Pas de permission(s) requise(s).',
        category: 'Musique',
        syntax: '<lien YouTube vers la musique que vous souhaitez écouter>'
    }
}