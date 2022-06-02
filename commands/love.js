const Discord = require('discord.js')
const config = require('../config.json')
poucentage = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"]

module.exports = {
    run: async (message) => {
        love = poucentage[Math.floor(Math.random() * poucentage.length)]
        member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez mentionner le membre dont vous voulez connaitre le pourcentage d\'amour avec lui/elle.')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(config.gif))
        if (love === "100") return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Tu files le parfait amour !`)
            .setDescription(`Toi et ${member} avez ${love}% de compatibilité`)
            .setColor('#00ff00')
            .setTimestamp())
        else if (love >= "75") return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Une belle histoire d\'amour s\'annonce...`)
            .setDescription(`Toi et ${member} avez ${love}% de compatibilité`)
            .setColor('#00ff00')
            .setTimestamp())
        else if (love === "69") return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Il va se passer des choses bizarres 🤭😏`)
            .setDescription(`Toi et ${member} avez ${love}% de compatibilité`)
            .setColor('#00ff00')
            .setTimestamp())
        else if (love >= "50") return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`C'est bof-bof on va pas se mytho !`)
            .setDescription(`Toi et ${member} avez ${love}% de compatibilité`)
            .setColor('#00ff00')
            .setTimestamp())
        else if (love >= "25") return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`T'es sûr que c'est ton ami ?`)
            .setDescription(`Toi et ${member} avez ${love}% de compatibilité`)
            .setColor('#00ff00')
            .setTimestamp())
        else if (love > "0") return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`C\'est ton pire ennemi à ce niveau là frr`)
            .setDescription(`Toi et ${member} avez ${love}% de compatibilité`)
            .setColor('#00ff00')
            .setTimestamp())
        else if (love === "0") return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Y\'a pas wesh`)
            .setDescription(`Toi et ${member} avez ${love}% de compatibilité`)
            .setColor('#00ff00')
            .setTimestamp())
    },
    name: 'love',
    help: {
        description: 'Pour connaitre le pourcentage d\'amour que vous avez avec un membre donné. Pas de permisson(s) requise(s).',
        category: "Fun",
        syntax: '<@membre>'
    }
}