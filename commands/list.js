const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../suggestion-db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('List all of the current suggestions that have been submitted.'),
	async execute(interaction) {
        db.all(async rows => {
            const topics = rows.map(r => r.topic).join('\n\t');

            await interaction.reply(`Submitted topics: \n\t${topics}`);
        });
	},
};
