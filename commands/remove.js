const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../suggestion-db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Remove the given input topic from the database.')
        .addStringOption(option => option.setName('topic')
                                         .setDescription('Topic to remove')
                                         .setRequired(true)),
	async execute(interaction) {
        const member = interaction.member;
        if (!member.permissions.has('ADMINISTRATOR')) {
            await interaction.reply({ content: 'Only server administrators are allowed to use this command.', ephemeral: true });
        } else {
            const topic = interaction.options.getString('topic');
            db.remove(topic);
            await interaction.reply({ content: `Successfully removed topic ${topic}`, ephemeral: true });
        }
	},
};
