const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('description')
		.setDescription(`해당 봇에 대한 설명`),
	async execute(interaction) {
		await interaction.reply(`2023-12-16일에 만들어진 디스코드 봇입니다.\n추후 OpenAI API를 연동할 예정`);
	},
};
