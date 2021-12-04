const Discord = require('discord.js')
number1 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
number2 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
number3 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

module.exports = {
    run: (message) => {
        number1_choisit = number1[Math.floor(Math.random() * number1.length)]
        number2_choisit = number2[Math.floor(Math.random() * number2.length)]
        number3_choisit = number3[Math.floor(Math.random() * number3.length)]

        if (message.channel.id !== '724704605342138469') return message.channel.send('Cette commande est uniquement utilisable dans le channel <#724704605342138469> !')

        else message.channel.send(new Discord.MessageEmbed()
            .setTitle('Machine à sous')
            .setDescription(' Votre tirage : ' + number1_choisit + ' | ' + number2_choisit + ' | ' + number3_choisit)
            .setColor('#00ddfd')
            .setTimestamp())
        if (number1_choisit === '7' && number2_choisit === '7' && number3_choisit === '7')
            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Gagné')
                .setDescription('Bravo, tu as gagné la suite la plus rare !')
                .setColor('#00ff00')
                .setTimestamp())

        else if (number1_choisit === number2_choisit && number2_choisit === number3_choisit)
            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Gagné')
                .setDescription('Vous avez gagné, félicitations')
                .setColor('#00ff00')
                .setTimestamp())
        else message.channel.send(new Discord.MessageEmbed()
            .setTitle('Perdu')
            .setDescription('Vous avez perdu, quel dommage...')
            .setColor('#ff0000')
            .setTimestamp())
    },
    name: 'arjent',
    guildOnly: true,
    help: {
        description: 'Alignez 3 mêmes chiffres et c\'est gagné ! Cette commande est uniquement utilisable dans le channel <#724704605342138469> !',
        category: 'Fun',
        syntax: ''
    }
}