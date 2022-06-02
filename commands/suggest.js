const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: (message, args) => {
        const suggestion = args.join(' ')
        if (!suggestion) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Merci de renseigner la suggestion à soumettre !`)
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Votre suggestion a bien été envoyée dans <#770299581996335115> !`)
            .setColor('#00ff00')
            .setTimestamp())
        message.guild.channels.cache.get(config.suggestChannel).send(new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle(`Nouvelle suggestion de la part de ${message.author.tag} :`)
            .setDescription(`${suggestion}`)
            .setFooter(`ID : ${message.author.id}`)
            .setTimestamp()).then(message => {
            message.react("✅")
            message.react("❌")
        })
    },
    name: 'suggest',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de faire une suggestion, elle sera soummise à un vote sur le serveur. Pas de permission(s) requise(s).',
        category: 'Utilitaire',
        syntax: '<suggestion>'
    }
}