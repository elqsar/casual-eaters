'use strict';

const index = require('./factories/AlgoliaFactory');

const SearchService = {
  searchByName: (bot, message) => {
    const splitted = message && message.text && message.text.split(' ');
    const query = splitted && splitted.length > 1 && splitted[1];
    if(query) {
      index.search(query, (err, content) => {
        if(err) return console.log('Done with error:', err);
        const result = content && content.hits && content.hits[0];
        if(result) {
          const reply = result.dishes.map((it) => {
            return `${it.dish.name}:${it.dish.price}`;
          });
          bot.reply(message, reply.join('\n'));
        }
      });
    } else {
      bot.reply(message, 'I\'m not sure about restaurant name :(');
    }
  }
}

module.exports = SearchService;
