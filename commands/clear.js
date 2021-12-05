const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../suggestion-db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('List all of the current suggestions that have been submitted.'),
	async execute(interaction) {
        const member = interaction.member;
        if (!member.permissions.has('ADMINISTRATOR')) {
            await interaction.reply({ content: 'Only server administrators are allowed to use this command.', ephemeral: true });
        } else {
            db.clear();
            await interaction.reply({ content: 'Successfully cleared database.', ephemeral: true });
        }
	},
};
