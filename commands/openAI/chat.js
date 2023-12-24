const { SlashCommandBuilder } = require('discord.js');
const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const AI_KEY = process.env.OPENAI_KEY;
const openai = new OpenAI({apiKey: AI_KEY});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('간단한 질문에 대한 답변을 해줌')
    .addStringOption(option =>
      option.setName('msg')
        .setDescription('질문 내용')
        .setRequired(true)),
  async execute(interaction) {
    const userMessage = interaction.options.getString('msg');
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "너는 한국어를 이용해 질문에 짧은 반말로 답변 해주는 비서야." },
          { role: "user", content: userMessage }
        ],
    });
    await interaction.reply(response.choices[0].message.content);
  },
};