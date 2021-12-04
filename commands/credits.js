const Discord = require('discord.js')
config = require('../config.json')

module.exports = {
    run: async (message) => {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('Voici les personnes qui ont aidés de près ou de loin sur le dévelopement de ce bot :')
        .setDescription('Un grand merci à <@454342163443220501> pour son aide sur la mise en place du GitHub *privé* du bot, la commande \`c.help\`, etc... 💙.\n\nMerci à <@514897773808582697> pour les photos de profil des bots 💪')
        .setFooter(`Crazy Bot ${config.version} — Made with ❤️ by ${config.ownerUsername}`)
        .setColor('#7289da')
        .setTimestamp()) 
    },
    name: 'credits',
    help: {
        description: 'Cette commande permet de montrer les crédits du bot. Pas de permisson(s) requise(s).',
        category: "Autre",
        syntax: ''
    }
}