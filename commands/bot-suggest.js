const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: (message, args, client) => {
        const botSuggestion = args.join(' ')
        if (!botSuggestion) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Merci de renseigner la suggestion à soumettre !`)
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Votre suggestion pour le bot a été envoyée !`)
            .setColor('#00ff00')
            .setTimestamp())
        client.users.fetch('588381876989853697').then(user => {
            user.send(new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL())
                .setTitle(`Nouvelle suggestion de la part de ${message.author.tag} :`)
                .setDescription(`${botSuggestion}`)
                .setFooter(`ID : ${message.author.id}`)
                .setTimestamp())
        });
    },
    name: 'bot-suggest',
    guildOnly: true,
    help: {
        description: `Cette commande permet de faire une suggestion pour le bot, elle sera envoyée en mp à ${config.ownerPing}. Pas de permission(s) requise(s).`,
        category: 'Utilitaire',
        syntax: '<suggestion>'
    }
}