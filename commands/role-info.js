const Discord = require('discord.js')
const moment = require('moment')
const config = require('../config.json')

module.exports = {
    run: message => {
        const role = message.mentions.roles.first()
        if (!role) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez mentionner le rôle dont vous voulez voir les informations.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        message.channel.send(new Discord.MessageEmbed()
            .addField('Rôle', role, true)
            .addField('Membres le possédant', role.members.size, true)
            .addField('Couleur', role.hexColor, true)
            .addField('Date de création', moment(role.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
            .addField('Affiché séparément', role.hoist ? 'Oui' : 'Non', true)
            .addField('Mentionnable', role.mentionable ? 'Oui' : 'Non', true)
            .setFooter(`ID : ${role.id}`)
            .setColor(role.hexColor)
            .setTimestamp())
    },
    name: 'role-info',
    guildOnly: true,
    help: {
        description: 'Cette commande permet d\'afficher les infos d\'un rôle. Pas de permission(s) requise(s).',
        category: "Utilitaire",
        syntax: '<@role>'
    }
}