const Discord = require('discord.js')
const nombre = ["1", "2", "3", "4"]

module.exports = {
    run: async (message) => {
        résultat = nombre[Math.floor(Math.random() * nombre.length)]
        member = message.mentions.members.first()
        if (!member) return message.channel.send(new Discord.MessageEmbed()
            .setDescription('Veuillez mentionner le membre avec qui vous voulez vous battre.')
            .setColor('#ff0000')
            .setTimestamp())
        if (résultat === "2") return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`${message.author.username} se bats contre quelqu\'un :`)
            .setDescription(`<@${message.author.id}> assène un puissant coup de poing à ${member}, ce qui le mets KO.\n\n<@${message.author.id}> a gagné !`)
            .setTimestamp())
        else if (résultat === "4") message.channel.send(new Discord.MessageEmbed()
                .setTitle(`${message.author.username} se bats contre quelqu\'un :`)
                .setDescription(`<@${message.author.id}> mets par terre ${member} et lui explose le crâne, ce qui le tue.\n\n<@${message.author.id}> a gagné !`)
                .setTimestamp())
            else if (résultat === "1") message.channel.send(new Discord.MessageEmbed()
                    .setTitle(`${message.author.username} se bats contre quelqu\'un :`)
                    .setDescription(`${member} casse les deux bras à <@${message.author.id}>, ce qui le mets hors-combat.\n\n${member} a gagné !`)
                    .setTimestamp())
                else if (résultat === "3") message.channel.send(new Discord.MessageEmbed()
                        .setTitle(`${message.author.username} se bats contre quelqu\'un :`)
                        .setDescription(`${member} mets au sol <@${message.author.id}> pour le maitriser, il ne peut plus bouger.\n\n${member} a gagné !`)
                        .setTimestamp())
    },
    name: 'fight',
    help: {
        description: 'Permet de combattre quelqu\'un. Pas de permisson(s) requise(s).',
        category: "Fun",
        syntax: '<@membre>'
    }
}