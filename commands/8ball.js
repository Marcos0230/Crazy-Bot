const Discord = require('discord.js')
replies = ['Oui', 'Non', 'Peut-être', 'Evidemment', 'Je ne sais pas', 'Je ne peux pas répondre à cette question', 'Ptdr t\'as vraiment cru toi x)']

module.exports = {
    run: (message, args) => {
        const question = args.join(' ')
        if (!question) return message.channel.send('Veuillez indiquer une question.')
        message.channel.send(new Discord.MessageEmbed()
            .setTitle(question)
            .setDescription(replies[Math.floor(Math.random() * replies.length)])
            .setTimestamp())
    },
    name: '8ball',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de poser une question fermée au bot (il répondra par oui, non ou autre), le bot y répondra. Pas de permission(s) requise(s).',
        category: 'Fun',
        syntax: '<question>'
    }
}