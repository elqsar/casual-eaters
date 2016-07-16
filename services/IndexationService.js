'use strict';

const index = require('./factories/AlgoliaFactory');

const IndexationService = {
  indexMenu: (data) => {
    index.addObject(data, (err, content) => {
      console.log('Add to Index ID:', content.objectID);
    });
  },
  cleanIndexes: () => {
    index.clearIndex((err, content) => {
      if(err) return console.log('Error. Unable to clean index', err);
      console.log('Success cleaning Index: dev_menus');
    });
  }
};

module.exports = IndexationService;
