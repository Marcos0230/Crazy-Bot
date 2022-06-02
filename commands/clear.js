const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
            .setColor('#ff0000')
            .setThumbnail(config.gif))
        const count = args[0]
        if (!/\d+/.test(count)) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez indiquer le nombre de message à supprimer !')
            .setColor('#ff0000')
            .setThumbnail(config.gif))
        if (count < 1 || count > 99) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Le nombre de message(s) doit être compris entre 1 et 99.')
            .setColor('#ff0000')
            .setThumbnail(config.gif))
        const {size} = await message.channel.bulkDelete(Number(count) + 1, true)
        message.channel.send(`${size - 1} messages ont été supprimés !`).then(sent => sent.delete({timeout: 5e3}))
    },
    name: 'clear',
    guildOnly: true,
    help: {
        description: 'Cette commande permet d\'effacer un nombre de messages précis très rapidement. Il faut avoir la permission \"MANAGE_MESSAGES\" pour utiliser cette commande !',
        category: "Modération",
        syntax: '<nombre de messages à effacer>'
    }
}