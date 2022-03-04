const Discord = require('discord.js')
const fs = require('fs')
const config = require('../config.json')

module.exports = {
    run: async (message, args, client) => {
        const channel = message.mentions.channels.first() || message.channel
        if (!client.db.tickets[channel.id]) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription('**Ce salon n\'est pas un ticket.**')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (!message.member.hasPermission('MANAGE_MESSAGES') && client.db.tickets[channel.id].author !== message.author.id) return message.channel.send('Vous n\'avez pas la permission de fermer ce ticket.')
        delete client.db.tickets[channel.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        await message.channel.send(new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setDescription(`Le ticket a été fermé ! Son nom était \"**${channel.name}**\"`)
            .setTimestamp())
        channel.delete()
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[FERMETURE TICKET] ${message.author.tag}`, message.author.displayAvatarURL())
            .addField('Fermé par', message.author, true)
            .setColor('#ff0000')
            .setTimestamp())
    },
    name: 'close',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de fermer un ticket. Il faut avoir la permission \"MANAGE_MESSAGES\" ou être le créateur du ticket pour utiliser cette commande !',
        category: "Ticket",
        syntax: '<#nom-du-channel>'
    }
}