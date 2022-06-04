const Discord = require('discord.js')
const city = ["Coney Crossroads", "Shifty Shafts", "Tilted Towers", "Condo Canyon"]
const rarity = ["Commune (grise)", "Peu commune (verte)", "Rare (bleue)", "Épique (violette)", "Légendaire (dorée)"]
const weapon = ["Fusil d\'assaut", "Pompe", "Snipe", "SMG/LMG/Minigun", "Lance roquettes/Lance grenades"]

module.exports = {
    run: async (message) => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Choix de la ville où tu dois atterrir...')
            .setDescription('Tu dois atterrir à ' + city[Math.floor(Math.random() * city.length)])
            .setThumbnail('https://static.wikia.nocookie.net/fortnite/images/0/0d/Carte_S3.png/revision/latest?cb=20190816164531&path-prefix=fr')
            .setFooter('Atterris à l\'endroit indiqué')
            .setTimestamp())
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Choix du type d\'arme...')
            .setDescription('Tu dois prendre une arme de type ' + weapon[Math.floor(Math.random() * weapon.length)])
            .setThumbnail('https://jeu-bayrou.com/wp-content/uploads/2021/05/Fusil-dassaut-Fortnite-Golden-Scar-Comment-obtenir-le-nouvel-exotique.jpg')
            .setFooter('Prends une arme du type indiqué')
            .setTimestamp())
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Choix de la rareté de ton arme...')
            .setDescription('Tu dois prendre une arme de rareté ' + rarity[Math.floor(Math.random() * rarity.length)])
            .setThumbnail('https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/04/fortnite-how-to-mark-weapons-different-rarity-quest-guide.jpg')
            .setFooter('Prends une arme de la rareté correspondante')
            .setTimestamp())
    },
    name: 'fortnite',
    guildOnly: true,
    help: {
        description: 'Pour pimenter tes games Fortnite. Merci à <@415148210156470272> pour l\'idée !',
        category: "Fun",
        syntax: ''
    }
}