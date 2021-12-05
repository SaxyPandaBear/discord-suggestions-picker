const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../suggestion-db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Accept a topic suggestion.')
        .addStringOption(option => option.setName('topic')
                                         .setDescription('Topic to suggest')
                                         .setRequired(true)),
	async execute(interaction) {
        const topic = interaction.options.getString('topic');
        db.submit(topic);
		await interaction.reply('Accepted.');
	},
};
