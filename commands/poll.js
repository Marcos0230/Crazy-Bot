const Discord = require('discord.js'),
    reactions = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        const [question, ...choices] = args.join(' ').split(' | ')
        if (!question) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez indiquer la question à poser.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (!choices.length) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez indiquer au moins 1 choix.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (choices.length > 20) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Il ne peut pas y avoir plus de 20 choix.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        message.delete()
        const sent = await message.channel.send(new Discord.MessageEmbed()
            .setTitle(question)
            .setDescription(choices.map((choice, i) => `${reactions[i]} ${choice}`).join('\n\n'))
            .setTimestamp())
        for (i = 0; i < choices.length; i++) await sent.react(reactions[i])
    },
    name: 'poll',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de créer un sondage. Il faut avoir la permission \"MANAGE_GUILD\" pour utiliser cette commande !',
        category: "Utilitaire",
        syntax: '<question | > <choix | choix | choix> (20 choix maximum)'
    }
}