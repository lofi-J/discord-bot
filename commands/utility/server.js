const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('서버 정보'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`${interaction.guild.name}서버에는 총 ${interaction.guild.memberCount}명이있습니다.`);
	},
};