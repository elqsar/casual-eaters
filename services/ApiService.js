'use strict';

const http = require('superagent');
const config = require('../config/config');
const StorageService = require('./StorageService');

const ApiService = {
  fetchDailyMenus: () => {
    StorageService.fetchRestaurantIds().then((result) => {
      if(result) {
        result.forEach((it) => {
          const name = it.val();
          const url = `https://developers.zomato.com/api/v2.1/dailymenu?res_id=${it.key}`;
          httpGET(url, (err, resp) => {
            if(err || resp.status != 200) {
              return console.log('Error fetching menus:');
            }
            StorageService.persistMenus(name, resp.body);
          });
        });
      }
    });
  },
  refreshRestaurantIds: () => {
    let start = 0;
    const step = config.max_step_to_fetch;
    while(start < 100) {
      const url = `https://developers.zomato.com/api/v2.1/search?entity_id=84&entity_type=city&` +
      `start=${start}&count=20&lat=50.078897&lon=14.427061&radius=1000&establishment_type=16`;
      httpGET(url, (err, resp) => {
        if(err || resp.status != 200) {
          return console.log('Error refreshing restaurant ids:', err);
        }
        StorageService.persistRestaurantIds(resp.body);
      });
      start = start + step;
    }
  }
};

const httpGET = (url, callback) => {
  http
    .get(url)
    .set('Accept', 'application/json')
    .set('user_key', config.zomato_token)
    .end(callback);
}

module.exports = ApiService;
