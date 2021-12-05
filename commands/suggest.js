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
        try {
            db.submit(topic);
		    await interaction.reply({ content: 'Successfully submitted', ephemeral: true });
        } catch {
            await interaction.reply({ content: 'Failed to submit', ephemeral: true });
        }
	},
};
