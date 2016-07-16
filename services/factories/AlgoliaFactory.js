'use strict';

const algolia = require('algoliasearch');
const config = require('../../config/config');

const client = algolia(config.search_app_id, config.search_api_key);

module.exports = client.initIndex('dev_menus');
