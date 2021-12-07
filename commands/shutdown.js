const Discord = require('discord.js')
 
module.exports = {
    run: async (message, client) => {
        if (message.author.id !== ('588381876989853697')) return message.channel.send(new Discord.MessageEmbed()
        .setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !')
        .setColor('#ff0000')
        .setTimestamp())
        else message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Le bot s'éteint...`)
            .setColor('#00ff00')
            .setTimestamp()),
        client.destroy()
    },
    name: 'shutdown',
    guildOnly: true,
    help: {
        description: 'Cette commande permet d\'éteindre le bot. Il faut avoir la permission \"ADMINISTRATOR\" pour utiliser cette commande !',
        category: "Autre",
        syntax: ''
    }
}