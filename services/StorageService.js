'use strict';

const promise = require('bluebird');
const database = promise.promisifyAll(require('./factories/FirebaseFactory'));
const IndexationService = require('./IndexationService');

const SPEC_CHARACTER = /[/\\#,!+()$~%.'":*?<>{}]/g;

const StorageService = {
  persistRestaurantIds: (data) => {
    const store = database.ref('ids');
    if(data && data.restaurants) {
      data.restaurants.forEach((it) => {
        if(it.restaurant) {
          const id = it.restaurant.id;
          const name = it.restaurant.name;
          if(id && name) {
            store.child(id).set(name);
          }
        }
      });
    }
  },
  persistMenus: (name, data) => {
    const store = database.ref('menus');
    const restaurantName = name.replace(SPEC_CHARACTER, '');
    if(data && data.daily_menus) {
      data.daily_menus.forEach((it) => {
        if(it.daily_menu) {
          IndexationService.indexMenu({
            name: restaurantName,
            dishes: it.daily_menu.dishes
          });
          store.child(restaurantName).set({
            name: restaurantName,
            dishes: it.daily_menu.dishes
          });
        }
      });
    }
  },
  fetchRestaurantIds: () => {
    const store = database.ref('ids');
    return store.once('value');
  },
  allMenus: () => {
    const store = database.ref('menus');
    return store.once('value');
  }
};

module.exports = StorageService;
