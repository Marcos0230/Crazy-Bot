const Discord = require('discord.js')
const city = ["Coney Crossroads", "Shifty Shafts", "Tilted Towers", "Condo Canyon"]
const rarity = ["Commune (grise)", "Peu commune (verte)", "Rare (bleue)", "Épique (violette)", "Légendaire (dorée)"]
const weapon = ["Fusil d\'assaut", "Pompe", "Snipe", "SMG/LMG/Minigun", "Lance roquettes/Lance grenades"]

module.exports = {
    run: async (message) => {
        await message.channel.send(new Discord.MessageEmbed()
            .setTitle('Choix de la ville où tu dois atterrir...')
            .setDescription('Tu dois atterrir à **' + city[Math.floor(Math.random() * city.length)] + "**")
            .setThumbnail('https://static.wikia.nocookie.net/fortnite/images/0/0d/Carte_S3.png/revision/latest?cb=20190816164531&path-prefix=fr')
            .setFooter('Atterris à l\'endroit indiqué')
            .setTimestamp())

        let chooseWeapon = weapon[Math.floor(Math.random() * weapon.length)]
        let embedThumbnail = null
        if (chooseWeapon === "Fusil d\'assaut") {
            embedThumbnail = "https://jeu-bayrou.com/wp-content/uploads/2021/05/Fusil-dassaut-Fortnite-Golden-Scar-Comment-obtenir-le-nouvel-exotique.jpg"
        } else if (chooseWeapon === "Pompe") {
            embedThumbnail = "https://static1.millenium.org/articles/9/31/86/39/@/789396-pompe-article_m-1.jpg"
        } else if (chooseWeapon === "Snipe") {
            embedThumbnail = "https://cdn2.unrealengine.com/Fortnite%2Fpatch-notes%2Fv5-21%2Foverview-text-v5-21%2FBR05_Yellow_Social_Heavy-Sniper-1920x1080-64c00b03bf0c4f747077946212885c9564a69a72.jpg"
        } else if (chooseWeapon === "SMG/LMG/Minigun") {
            embedThumbnail = "https://staticg.sportskeeda.com/editor/2022/04/dda6a-16506263152111-1920.jpg"
        } else if (chooseWeapon === "Lance roquettes/Lance grenades") {
            embedThumbnail = "https://xboxplay.games/uploadStream/22470.jpg"
        }

        await message.channel.send(new Discord.MessageEmbed()
            .setTitle('Choix du type d\'arme...')
            .setDescription('Tu dois prendre une arme de type **' + chooseWeapon + "**")
            .setThumbnail(embedThumbnail)
            .setFooter('Prends une arme du type indiqué')
            .setTimestamp())

        let chooseRarity = rarity[Math.floor(Math.random() * rarity.length)]
        let embedColor = null
        if (chooseRarity === "Commune (grise)") {
            embedColor = "#808080"
        } else if (chooseRarity === "Peu commune (verte)") {
            embedColor = "#00ff00"
        } else if (chooseRarity === "Rare (bleue)") {
            embedColor = "#1f75fe"
        } else if (chooseRarity === "Épique (violette)") {
            embedColor = "#800080"
        } else if (chooseRarity === "Légendaire (dorée)") {
            embedColor = "#ffd700"
        }

        await message.channel.send(new Discord.MessageEmbed()
            .setTitle('Choix de la rareté de ton arme...')
            .setDescription('Tu dois prendre une arme de rareté **' + chooseRarity + "**")
            .setThumbnail('https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/04/fortnite-how-to-mark-weapons-different-rarity-quest-guide.jpg')
            .setColor(embedColor)
            .setFooter('Prends une arme de la rareté correspondante. Si elle n\'existe pas, prendre la plus petite possible')
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