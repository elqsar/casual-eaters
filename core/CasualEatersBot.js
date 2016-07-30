'use strict';

const config = require('../config/config');
const Botkit = require('botkit');
const IndexationService = require('../services/IndexationService');
const CronService = require('../services/CronService');
const ApiService = require('../services/ApiService');
const BotCommands = require('./BotCommands');

const FETCH_MENUS = '00 00 10 * * *';
const CLEAN_INDEX = '00 30 23 * * *';
const MESSAGE_TYPES = 'direct_message,direct_mention,mention,ambient';

const CasualEatersBot = {
  run: (mode) => {
    const controller = Botkit.slackbot({
      debug: mode
    });
    const bot = controller.spawn({
      token: config.slack_token,
      retry: config.bot_retries
    });

    bot.startRTM((err, bot, payload) => {
      if(err) {
        throw new Error(err);
      }
    });

    const fetchJob = CronService.createJob(FETCH_MENUS, () => {
      ApiService.fetchDailyMenus();
    });
    fetchJob.start();
    const cleanJob = CronService.createJob(CLEAN_INDEX, () => {
      IndexationService.cleanIndexes();
    });
    cleanJob.start();

    controller.hears(['menu'], MESSAGE_TYPES, BotCommands.searchByName);
    controller.hears(['all'], MESSAGE_TYPES, BotCommands.all);
    controller.hears(['help'], MESSAGE_TYPES, BotCommands.help);
  }
};

module.exports = CasualEatersBot;
