const Discord = require('discord.js'), //Déclaration de toutes les constantes nécessaires au fonctionnement du bot et du fichier lui-même
    client = new Discord.Client({
        partials: ['MESSAGE', 'REACTION'],
        fetchAllMembers: true
    }),
    config = require('./config.json'),
    token = require('./token.json'),
    fs = require('fs'),
    humanizeDuration = require('humanize-duration'),
    got = require('got'),
    dispatcher = require('./commands/musicPlay')

client.login(token.token) //Le bot se connecte via le token (stocké dans un fichier séparé)
client.commands = new Discord.Collection() //On crée une nouvelle collection où l'on peut stocker les commandes
client.db = require('./db.json') //Comme une constante mais côté client

client.once('ready', () => {
    console.log('Bot lancé ! Aucun problème détecté au démarrage du bot.'); //Confirmation que le bot est online
});

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command) //On lit le dossier commands et on ne garde que les fichiers finissant par ".js", on est ajoute ensuite dans la collection pour les appeler ailleurs
    })
})

client.on('message', message => {
    if (message.content.includes(token.token)) {
        message.delete()
        console.log('Le token a été envoyé sur Discord, la sécurité du bot est compromise : régénère le token du bot au plus vite !'); //Si le token du bot est leak, le bot supprime automatiquement tout message le contenant et me prévient
    };

    if (message.type !== 'DEFAULT' || message.author.bot) return //On ignore tout les message provenant de bot ou tout les messages n'étant pas des messages de type "DEFAULT" (les messages du système de bienvenue de Discord par exemple)

    if (!message.member.hasPermission('MANAGE_CHANNELS') && client.db.lockedChannels.includes(message.channel.id)) return message.delete() //Le bot supprime tout message dont l'auteur n'a pas la perm citée et que le salon est locké

    const evalaccess = ["588381876989853697"]
    let clean = text => {
        if (typeof text === "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    };

    if (message.content.startsWith(">eval")) {
        if (!evalaccess.includes(message.author.id)) return;
        try {
            const code = message.content.substr(6);
            let evaled = eval(code);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            if (evaled.length > 2000)
                evaled =
                    "Je ne peux pas envoyer un message de plus de 2000 caractères.";
            message.channel.send(clean(evaled), { code: "xl" });
            message.react("✅");
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`\n${clean(err)}\n\`\`\``);
            message.react("❌");
        }
    } //(de la ligne 39 à ici) Permet d'executer du code JS directement via Discord ; c'est extrêment dangereux de s'en servir sans savoir ce que l'on fait ou de laisser les perms à quelqu'un d'autre que vous-même !

    if (message.content.startsWith("<@684135354437075001>")) {
        message.channel.send(new Discord.MessageEmbed()
            .setDescription("Bonjour 👋 ! Je suis <@684135354437075001>, un bot multifonction crée et développé par " + config.ownerUsername + ".\n__**Prefix :**__ \`" + config.prefix + "\`")
            .setFooter('Faites c.help pour plus d\'infos'))
    }

    if (message.content.startsWith("<@!684135354437075001>")) {
        message.channel.send(new Discord.MessageEmbed()
            .setDescription("Bonjour 👋 ! Je suis <@684135354437075001>, un bot multifonction crée et développé par " + config.ownerUsername + ".\n__**Prefix :**__ \`" + config.prefix + "\`")
            .setFooter('Faites c.help pour plus d\'infos'))
    } //(de la ligne 66 à ici) Envoie un message prédeterminé si le bot est ping

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase() //Le message de commande est réduit en minuscule (on peut donc écrire C.HeLp et ça marchera)
    if (!commandName.startsWith(config.prefix)) return //S'il n'y a pas le bon prefix devant une commande connue, on ignore le message (s'il y a d'autres bot sur le serveur avec les mêmes commandes)
    const command = client.commands.get(commandName.slice(config.prefix.length)) //On définit command comme le nom d'une commande
    if (!command) return //S'il n'y a pas de commande, on ignore
    if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.') //Si la commande est définit comme utilisable dans un serveur uniquement, le bot le fera savoir tout en ne faisant pas la commande
    command.run(message, args, client) //Sinon on execute la commande normalement
})

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(`${member}`, new Discord.MessageEmbed()
        .setDescription(`${member} a rejoint le serveur. Nous sommes désormais ${member.guild.memberCount} ! 🎉`)
        .setTimestamp()
        .setColor('#00ff00'))
    member.roles.add(config.greeting.role)
}) //Message de bienvenue

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.goodbye).send(new Discord.MessageEmbed()
        .setDescription(`${member.user.tag} a quitté le serveur... 😢`)
        .setTimestamp()
        .setColor('#ff0000'))
}) //Message d'au revoir

client.on('ready', () => {
    const statuses = [
        'son développeur ' + config.ownerUsername,
        'son prefix : ' + config.prefix,
        'sa version : ' + config.version
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i], { type: 'WATCHING' })
        i = ++i % statuses.length
    }, 10000)
}) //Permet de setup le statut du bot

client.on('channelCreate', channel => {
    if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })
}) //Si un channel est crée, les perms pour le rôle Muted seront automatiquement ajoutées