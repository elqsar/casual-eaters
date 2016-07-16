const StorageService = require('../services/StorageService');
const SearchService = require('../services/SearchService');

const BotCommands = {
  searchByName: (bot, message) => {
    SearchService.searchByName(bot, message);
  },
  all: (bot, message) => {
    StorageService.allMenus().then((data) => {
      const reply = [];
      data.forEach((it) => {
        reply.push(it.key);
      });
      bot.reply(message, reply.join('\n'));
    });
  },
  help: (bot, message) => {
    bot.reply(message, '```Usage:\nall - see all restaurants with daily menu\nmenu <restaurant name> - get daily menu```')
  }
};

module.exports = BotCommands;
