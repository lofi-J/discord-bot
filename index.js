// import file system & path modules
const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { 
  Client, Events, GatewayIntentBits,
  REST, Routes, Collection
} = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const TOKEN = process.env.TOKEN;
const DISCORD_KEY = process.env.DISCORD_KEY;
const GUILD_ID = process.env.GUILD_ID;

// Create a new client instance
// iscord.js 클라이언트가 예상대로 작동하려면 인텐트 옵션이 필요. 
// 길드, 채널 및 역할에 대한 캐시가 채워지고 내부용으로 사용 가능하도록 보장한다. (길드 == 디스코드 서버)
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({version: '10'}).setToken(TOKEN);

// 명령어 읽어오기
client.commands = new Collection();
const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for(const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command); // client에 명령어 등록
      commands.push(command.data.toJSON()); // 등록할 명령어 리스트 push
    } else {
      console.log(`[경고] ${filePath}은 'data'또는 'execute'프로퍼티가 없음.`);
    }
  }
}

// When the client is ready
client.once(Events.ClientReady, readyClient => {
  console.log(`${readyClient.user.tag} 준비 완료.`);
});

// 명령어 상호 작용 수신 함수
client.on(Events.InteractionCreate, async interaction => {
  if(!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if(!command) {
    console.error(`일치하는 명령이 없습니다. [${interaction.commandName}]`);
  }

  try {
    await command.execute(interaction);
  } catch(error) {
    console.error(error);
    if(interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true }); 
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

// 슬래시 명령어 등록
(async () => {
  try {
    console.log('Started Refreshing application (/) commands.');
    const data = await rest.put(Routes.applicationGuildCommands(DISCORD_KEY, GUILD_ID), {
      body: commands,
    });
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    client.login(TOKEN);
  }
  catch(err) {
    console.error(err);
  }
})();