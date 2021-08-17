const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[BOT] | Bot supporters and commands have loaded, done!`);
  console.log(`[BOT] | (${client.user.username}) is ready!
  ‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);
  client.user.setStatus("online");
  client.user.setActivity("Update!", { type: "WATCHING"}); //// TYPE - WATCHING , PLAYING , LISTENING gibi değiştirilebilir.
  console.log(`Ro-Verification`);

};
