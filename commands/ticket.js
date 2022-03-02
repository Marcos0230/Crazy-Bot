const config = require('../config.json'),
    fs = require('fs'),
    Discord = require('discord.js')

module.exports = {
    run: async (message, args, client) => {
        if (Object.values(client.db.tickets).some(ticket => ticket.author === message.author.id)) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription('**Vous avez déjà un ticket ouvert !**')
            .setTimestamp()
            .setThumbnail(config.gif))
        const channel = await message.guild.channels.create(`ticket ${message.author.username}`, {
            type: 'text',
            parent: config.ticket.category,
            permissionOverwrites: [{
                id: message.guild.id,
                deny: 'VIEW_CHANNEL'
            }, {
                id: message.author.id,
                allow: 'VIEW_CHANNEL'
            }, ...config.ticket.roles.map(id => ({
                id,
                allow: 'VIEW_CHANNEL'
            }))]
        })
        client.db.tickets[channel.id] = {
            author: message.author.id
        }
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        channel.send(new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setDescription(`Bonjour ${message.member}, bienvenue dans votre ticket. Le Staff va bientôt arriver pour s'occuper de vous !`)
            .setTimestamp())
        message.channel.send(new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setDescription(`**Votre ticket a été créé ! Retrouvez le ici => ${channel}.**`)
            .setTimestamp())
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[OUVERTURE TICKET] ${message.author.tag}`, message.author.displayAvatarURL())
            .addField('Ouvert par', message.author, true)
            .setColor('#00ff00')
            .setTimestamp())
    },
    name: 'ticket',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de créer un ticket pour obtenir de l\'aide. Pas de permisson(s) requise(s).',
        category: "Ticket",
        syntax: '[raison]'
    }
}