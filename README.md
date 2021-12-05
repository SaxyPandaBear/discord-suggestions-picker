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

### Commands
Commands should be singular, and written in individual JS files in the `/commands` directory.

### Storage
This bot depends on a local SQLite database for persisting/reading the topics that are submitted.
The `./suggestion-db.js` file is the interface for the database, which has a locking mechanism to
enforce consistent read/writes.

One way to view the contents of the SQLite database is to use a tool, such as
[DB Browser for SQLite](https://sqlitebrowser.org/dl/) - most useful for windows environments.
You can also view the contents of the database via command-line (Mac/Linux).

TODO: write more on development set up

## Testing

TBD
