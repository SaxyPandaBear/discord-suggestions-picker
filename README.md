Suggestions Picker
==================

The purpose of this bot is to accept suggestions, store them, and then pick one of the
suggestions on request. The idea would be that the suggestions would be cleared after 
selecting one of them.

## Development
This Discord bot is written in NodeJS. Dependencies are managed in the `package.json` file.

### Install dependencies
```
npm install
```

### Registering slash commands
For quicker development, the recommendation is to start with guild specific command registration,
```javascript
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
```
and then to replace the command registration path with the global one.
```javascript
rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
```
See `./deploy-commands.js` for this. This script should be run during development for testing
and finalizing command registration

### Commands
Commands should be singular, and written in individual JS files in the `/commands` directory.

### Storage
This bot depends on a local SQLite database for persisting/reading the topics that are submitted.
The `./suggestion-db.js` file is the interface for the database, which has a locking mechanism to
enforce consistent read/writes.

One way to view the contents of the SQLite database is to use a tool, such as
[DB Browser for SQLite](https://sqlitebrowser.org/dl/) - most useful for Windows environments.
You can also view the contents of the database via command-line (Mac/Linux).

### Secrets
This package uses `dotenv` for injecting secrets as environment variables. They get stored in a
`.env` file, and to inject them at runtime, simply run `node -r dotenv/config index.js`.

Take a look at the `.env.template` file to see what variables might be needed (or just keep reading).
```
DISCORD_TOKEN=ABC123
CLIENT_ID=1234567890
GUILD_ID=9876543210
APPLICATION_ID=908173645
```
`DISCORD_TOKEN` is **required** at runtime for the bot to authenticate. This means that the token
must be in the environment variables for both development and deployment.

`CLIENT_ID` is needed for all command registrations, whether it is guild or global commands. It
is not required at runtime for deployments, but is needed for development to register/update/delete
commands.

`GUILD_ID` is needed for command registration for specific guilds. This makes it a requirement for
development, but not at runtime for deployments.

`APPLICATION_ID` is only required for deleting global commands (as far as I know).

## Testing

TBD
