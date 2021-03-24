const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const settings = require('../ayarlar.json');

var prefix = settings.prefix;

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("online");
client.user.setGame("SCUB VERİTABANI");
  console.log(`Eh Be Uşağum Sonunda Aktif Ettin Beni`);
};
