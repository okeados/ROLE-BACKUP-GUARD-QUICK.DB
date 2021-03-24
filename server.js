const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const YouTube = require('simple-youtube-api');
const chalk = require('chalk');
const fs = require('fs');
const ms = require("parse-ms");
const moment = require('moment');
const db = require('quick.db')
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};








/////////////////

const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);

////////////////

const guildId = "712343562058203216"; // SUNUCU ID


client.on("ready", () => {
  console.log(`Giriş yapıldı ${client.user.tag}!`);
  
  setInterval(() => roleBackup(), 86400000);
});



client.on("roleDelete", async role => {
  console.log("Role " + role.name + " deleted, trying to restore it....");
const entry = await role.guild.fetchAuditLogs({type: "ROLE_DELETE"}).then(logs => {
  const yetkili = logs.entries.first().executor;
   






//////////////////// botların id si ////////////////////
  if (yetkili.id === "711654144653394021") return;
  if (yetkili.id === "711658250453385308") return;
  if (yetkili.id === "711658622496800870") return;
  if (yetkili.id === "711659429174444132") return;
  if (yetkili.id === "711667213244825602") return;
  if (yetkili.id === "711668048498655262") return;
 ////////////////////////////////////////////////////////////


//////////////////// İŞTE OTOROL BOTU FALAN ONLARIN ID Sİ
  if (yetkili.id === "711575688578334821") return;
  if (yetkili.id === "204255221017214977") return;
  if (yetkili.id === "275813801792634880") return;
 ////////////////////////////////////////////////////////////



  const guild = client.guilds.get(guildId);
  let savedRoles = JSON.parse(fs.readFileSync("./roles.json"));
  let savedRole = savedRoles[role.id];
  savedRoles[role.id] = null;
  if (savedRole != undefined) {
    guild
      .createRole({
        color: savedRole.color,
        hoist: savedRole.hoist,
        mentionable: savedRole.mentionable,
        name: savedRole.name,
        position: savedRole.position,
        permissions: savedRole.permissions
      })
      .then(nRole => {
        for (let uId of savedRole.members) {
          let user = guild.members.get(uId);
          if (user != undefined) {
          setInterval (function () {
        user.addRole(nRole);
          }, 500);
            
          }
        }
        role.guild.owner.send(
            nRole.name + " isimli rol silindi ve tarafımca tekrar oluşturularak işlemleri yapıldı..."
          );
      });
  }
})
});
function roleBackup() {
  const guild = client.guilds.get(guildId);
  let savedRoles = JSON.parse(fs.readFileSync("./roles.json"));
  guild.roles.forEach(role => {
    let members = role.members.map(gmember => gmember.id);
    savedRoles[role.id] = {
      id: role.id,
      color: role.color,
      hoist: role.hoist,
      mentionable: role.mentionable,
      name: role.name,
      position: role.position,
      permissions: role.permissions,
      members: members
    };
console.log("Tüm roller backuplandı")
    fs.writeFileSync("./roles.json", JSON.stringify(savedRoles));
  });
}




/////////////////

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});




client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  const yetkili = await role.guild.members.get(entry.executor.id);
  const eskihali = role.permissions;
  console.log(eskihali);

  if (yetkili.id === "709228539001700422") return;//SCUB
  if (yetkili.id === "391063625453797377") return;///// VİTO CORLEONE
  if (yetkili.id === "712625282007171072") return;///// FESSJACKS
  if (yetkili.id === "712625282007171072") return;///// ESCOBAR







//////////////////// botların id si ////////////////////
  if (yetkili.id === "711654144653394021") return;
  if (yetkili.id === "711658250453385308") return;
  if (yetkili.id === "711658622496800870") return;
  if (yetkili.id === "711659429174444132") return;
  if (yetkili.id === "711667213244825602") return;
  if (yetkili.id === "711668048498655262") return;
 ////////////////////////////////////////////////////////////

//////////////////// Burası Zira bot Ve Otorol Vericek id ler
  if (yetkili.id === "711644480284917842") return;
  if (yetkili.id === "204255221017214977") return;
  if (yetkili.id === "275813801792634880") return;
 ////////////////////////////////////////////////////////////


  
  const sChannel = role.guild.channels.find(c => c.id === "712343565258457207");
  let embed = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(
      `<a:git:705620596418936895> <@${yetkili.id}> **isimli kişi ${role.name} isimli rolü sildi yetkileri alındı**<a:412:704816727971594292>  \n \n <a:git:705620596418936895> **Tüm rollerini alarak Cezalıya attım** <a:ek:705620596314210353> \n \n <a:nikkosred:662296251148009506>  **Sunucu sahibine DM atıldı**<a:ek:705620596314210353> \n \n <a:nikkosloa:662302632957968404>  **Rol aynı izinleriyle tekrar açıldı ( Savelenen rol ise eski kişilere tekrar dağıtıldı )  ** <a:555:705894758093946941> `
    )
    .setTimestamp();
  role.guild.owner.send(
    ` **<@${yetkili.id}> İsimli yetkilin ${role.name} adlı rolü sildiği için yetkileri alındı **  \n \n  **Rol aynı izinleriyle tekrar açıldı ( Savelenen rol ise eski kişilere tekrar dağıtıldı )**  \n \n   **Tüm rollerini alarak Cezalıya attım** `
  );
  let roles = role.guild.members.get(yetkili.id).roles.array();
  try {
    role.guild.members.get(yetkili.id).removeRoles(roles);
  } catch (err) {
    console.log(err);
  }
  setTimeout(function() {
    role.guild.members.get(yetkili.id).addRole("712343562116661334");
  }, 1500);
  let rolss = role.guild.roles.find(rol => rol.id === `${role.id}`);

  role.guild
    .createRole({
      name: role.name,
      color: role.color,
      permissions: eskihali,
      position: role.position,
      mentionable: role.mentionable
    })
    .then(async amcik => {
      let varmi = await db.fetch("korumaCiks_" + role.guild.id + "_" + role.id);
      db.set("korumaCiks_" + role.guild.id + "_" + amcik.id, 1);
      db.delete("korumaCiks_" + role.guild.id + "_" + role.id);

      if (varmi) {
        let money = await db.startsWith(
          "RolKorumaCiks_" + role.guild.id + "_" + role.id
        );
        for (let i = 0; i < money.length; i++) {
          let data = money[i].data;
          let user = money[i].ID.split("_")[3];
          console.log(user);
          client.guilds
            .get(role.guild.id)
            .members.get(`${user}`)
            .addRole(amcik.id);
          db.set(
            "RolKorumaCiks_" + role.guild.id + "_" + amcik.id + "_" + user,
            1
          );
        }
      }
    });
});






client.login(ayarlar.token);




