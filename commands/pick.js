const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../suggestion-db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pick')
		.setDescription('Chooses one of the suggested topics at random.'),
	async execute(interaction) {
        const member = interaction.member;
        if (!member.permissions.has('ADMINISTRATOR')) {
            await interaction.reply({ content: 'Only server administrators are allowed to use this command.', ephemeral: true });
        } else {
            db.all(async rows => {
                const topics = rows.map(r => r.topic);
                const idx = Math.round(Math.random() * (topics.length - 1));
                const topic = topics[idx];
                await interaction.reply(`Selected ${topic}!`);
            });
        }
	},
};
