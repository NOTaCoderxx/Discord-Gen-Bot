const Discord = require("discord.js");
const { Client, GatewayIntentBits, Intents } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ]
});
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function (request, response) {
    var result = 'Le bot est en marche.'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('The bot is up and running on the port', app.get('port'));
});
client.on('ready', () => {
    console.log('ready')
    client.user.setActivity(`Account Generator`);
});

const commands = [
    new SlashCommandBuilder()
        .setName('test')
        .setDescription('Checks if the bot is working')
        .toJSON(),

    new SlashCommandBuilder()
        .setName('gen')
        .setDescription('Generate an account')
        .addStringOption(option =>
            option.setName('service')
                .setDescription('The service to be generated')
                .setRequired(true)
        .addChoices({
            name: 'Crunshyroll', // You can add or modify commands suggestions here
            value: 'Crunshyroll'
        })
        .addChoices({
            name: 'Disney+', 
            value: 'Disney+'
        })
        .addChoices({
            name: 'Deezer', 
            value: 'Deezer'
        })
        .addChoices({
            name: 'Molotov', 
            value: 'Molotov'
        })
        .addChoices({
            name: 'PornHub', 
            value: 'PornHub'
        })
        .addChoices({
            name: 'Nocibe', 
            value: 'Nocibe'
        })
        .addChoices({
            name: 'Netflix', 
            value: 'Netflix'
        })
        .addChoices({
            name: 'TF1', 
            value: 'TF1'
        })
        .addChoices({
            name: 'Action', 
            value: 'Action'
        })
        .addChoices({
            name: 'Quick', 
            value: 'Quick'
        })
        .addChoices({
            name: 'CDiscount', 
            value: 'CDiscount'
        })
                        )
        .toJSON(),

    new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add an account')
        .addStringOption(option =>
            option.setName("compte")
                .setDescription('The account to add')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('service')
                .setDescription('Service name')
                .setRequired(true))
        .toJSON(),

    new SlashCommandBuilder()
        .setName('genadmin') // Command /gen with no cooldown
        .setDescription('Admins can generate accounts')
        .addStringOption(option =>
            option.setName('service')
                .setDescription('The service to be generated')
                .setRequired(true)
        .addChoices({
            name: 'Crunshyroll', // You can add or modify commands suggestions here
            value: 'Crunshyroll'
        })
        .addChoices({
            name: 'Disney+', 
            value: 'Disney+'
        })
        .addChoices({
            name: 'Deezer', 
            value: 'Deezer'
        })
        .addChoices({
            name: 'Molotov', 
            value: 'Molotov'
        })
        .addChoices({
            name: 'PornHub', 
            value: 'PornHub'
        })
        .addChoices({
            name: 'Nocibe', 
            value: 'Nocibe'
        })
        .addChoices({
            name: 'Netflix', 
            value: 'Netflix'
        })
        .addChoices({
            name: 'TF1', 
            value: 'TF1'
        })
        .addChoices({
            name: 'Action', 
            value: 'Action'
        })
        .addChoices({
            name: 'Quick', 
            value: 'Quick'
        })
        .addChoices({
            name: 'CDiscount', 
            value: 'CDiscount'
        })
                        )
        .toJSON(),

    new SlashCommandBuilder()
        .setName('restock')
        .setDescription('Restock a service')
        .addStringOption(option =>
            option.setName('service')
                .setDescription('The restocking service')
                .setRequired(true)
        .addChoices({
            name: 'Crunshyroll', // You can add or modify commands suggestions here
            value: 'Crunshyroll.txt'
        })
        .addChoices({
            name: 'Disney+', 
            value: 'Disney+'
        })
        .addChoices({
            name: 'Deezer', 
            value: 'Deezer'
        })
        .addChoices({
            name: 'Molotov', 
            value: 'Molotov'
        })
        .addChoices({
            name: 'PornHub', 
            value: 'PornHub'
        })
        .addChoices({
            name: 'Nocibe', 
            value: 'Nocibe'
        })
        .addChoices({
            name: 'Netflix', 
            value: 'Netflix'
        })
        .addChoices({
            name: 'TF1', 
            value: 'TF1'
        })
        .addChoices({
            name: 'Action', 
            value: 'Action'
        })
        .addChoices({
            name: 'Quick', 
            value: 'Quick'
        })
        .addChoices({
            name: 'CDiscount', 
            value: 'CDiscount'
        })
                        )
        .toJSON(),
    
    new SlashCommandBuilder()
        .setName('stock')
        .setDescription("View department stock")
        .addStringOption(option =>
            option.setName('service')
                .setDescription('View a service stock')
                .setRequired(true)
        .addChoices({
            name: 'Crunshyroll', // You can add or modify commands suggestions here
            value: 'Crunshyroll'
        })
        .addChoices({
            name: 'Disney+', 
            value: 'Disney+'
        })
        .addChoices({
            name: 'Deezer', 
            value: 'Deezer'
        })
        .addChoices({
            name: 'Molotov', 
            value: 'Molotov'
        })
        .addChoices({
            name: 'PornHub', 
            value: 'PornHub'
        })
        .addChoices({
            name: 'Nocibe', 
            value: 'Nocibe'
        })
        .addChoices({
            name: 'Netflix', 
            value: 'Netflix'
        })
        .addChoices({
            name: 'TF1', 
            value: 'TF1.txt'
        })
        .addChoices({
            name: 'Action', 
            value: 'Action'
        })
        .addChoices({
            name: 'Quick', 
            value: 'Quick'
        })
        .addChoices({
            name: 'CDiscount', 
            value: 'CDiscount'
        })
        )
        .toJSON()
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options, member, channel, user } = interaction;

    if (interaction.channel.id !== '1234567890') { // Change your chanel ID
        return interaction.reply({
            content: "This command is only available in the YOUR_CHANEL chanel.",
            ephemeral: true
        });
    }

    if (commandName === 'test') {
        await interaction.reply("The bot works.");
    } else if (commandName === 'gen') {
    if (generated.has(interaction.user.id)) {
        await interaction.reply(
            "Wait 15 minutes before generating another account, " +
            interaction.user.username + " !"
        );
    } else {
        const args = options.getString('service');
        if (!args) {
            await interaction.reply("Please specify the service you require !");
            return;
        }

        const filePath = __dirname + "/" + args + ".txt";

        fs.readFile(filePath, function (err, data) {
            if (!err) {
                data = data.toString();
                var position = data.toString().indexOf("\n");
                var firstLine = data.split("\n")[0];
                interaction.user.send("Here is the generated account: " + firstLine);
                if (position != -1) {
                    data = data.substr(position + 1);
                    fs.writeFile(filePath, data, function (err) {
                        interaction.reply("Account generated !");
                        generated.add(interaction.user.id);
                        setTimeout(() => {
                            // Removes the user from the set after a minute
                            generated.delete(interaction.user.id);
                        }, 900000); // Cooldown in ms
                        if (err) {
                            console.log(err);
                        }
                    });
                } else {
                    interaction.reply(
                        "If there are still accounts in stock, check your PMs!"
                    );
                }
            } else {
                interaction.reply(
                    "Sorry, this service does not yet exist in our database."
                );
            }
        });
    }
    } else if (commandName === 'add') {
    if (!interaction.member.roles.cache.has('1234567890')) { // Change with your role ID
        await interaction.reply("Sorry, you need the MynelyGen role to do this!");
        return;
    }

    const compte = options.getString('account');
    const service = options.getString('service');

    if (!compte || !service) {
        await interaction.reply("Please specify the service and account to be added!");
        return;
    }

    const filePath = __dirname + "/" + service + ".txt";

    fs.appendFile(filePath, os.EOL + compte, function (err) {
        if (err) {
            console.error(err);
            interaction.reply("An error occurred while adding the account.");
        } else {
            interaction.reply("Account added !");
        }
    });
      } else if (commandName === 'genadmin') {
    if (generated.has(interaction.user.id)) {
        await interaction.reply(
            "Wait 15 minutes before generating another account, " +
            interaction.user.username + " !"
        );
    } else {
        const args = options.getString('service');
        if (!args) {
            await interaction.reply("Please specify the service you require !");
            return;
        }

        const filePath = __dirname + "/" + args + ".txt";

        fs.readFile(filePath, function (err, data) {
            if (!err) {
                data = data.toString();
                var position = data.toString().indexOf("\n");
                var firstLine = data.split("\n")[0];
                interaction.user.send("Here is the generated account: " + firstLine);
                if (position != -1) {
                    data = data.substr(position + 1);
                    fs.writeFile(filePath, data, function (err) {
                        interaction.reply("Account generated !");
                        generated.add(interaction.user.id);
                    });
                } else {
                    interaction.reply(
                        "If there are still accounts in stock, check your DMs !"
                    );
                }
            } else {
                interaction.reply(
                    "Sorry, this service does not yet exist in our database."
                );
            }
        });
}
    } else if (commandName === 'restock') {
    if (!interaction.member.roles.cache.has('1234567890')) { // Change with your role ID
        await interaction.reply("Sorry, you need the YOUR_ROLE role to do this !");
        return;
    }

    const args = options.getString('service');
    if (!args) {
        await interaction.reply("Please specify the service you wish to restock !");
        return;
    }

    await interaction.reply(
        "**" +
        args +
        "**" +
        " was restocked by " +
        "<@" +
        interaction.user.id +
        ">"
    );
    }
if (commandName === 'stock') {
    const args = options.getString('service');
    if (!args) {
        await interaction.reply("Merci de spécifier le service pour lequel vous souhaitez connaître le stock !");
        return;
    }

    const filePath = __dirname + "/" + args + ".txt";

    fs.readFile(filePath, function (err, data) {
        if (!err) {
            const lines = data.toString().split('\n').length;
            interaction.reply(`The service ${args} contains ${lines} account(s).`);
        } else {
            interaction.reply("CThis service does not yet exist in our database.");
        }
    });
}
    // Add more commands here
});

client.login(token); // Change in config.json