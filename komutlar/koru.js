const Discord = require("discord.js")
const db = require('quick.db')
exports.run = async (client, message,args) => {

if(message.author.id !== "711644480284917842") return message.channel.send('Sunucu Kurucusu Değilsin!')


function yolla (mesa) {message.channel.send(mesa)}
  let rol = message.mentions.roles.first() || message.guild.roles.get(args[0]) 
  if(!rol) return message.reply('Rolü belirtmedin!')
  yolla(rol + ' Reis Siksen Bu Rolü Silemezler Çünkü Ben Koruyom amq')
  db.set('korumaCiks_'+message.guild.id+'_'+rol.id,1)
 message.guild.roles.get(rol.id).members.forEach(r=>{
   
   db.set('RolKorumaCiks_'+message.guild.id+'_'+rol.id+'_'+r.id,1)                                                
                                                
                                                
                                                 })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "koruc",
  description: "test",
  usage: "test"
};