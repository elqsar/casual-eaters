'use strict';

const CronJob = require('cron').CronJob;

const CronService = {
  createJob: (pattern, callback) => {
    return new CronJob({
      cronTime: pattern,
      onTick: callback,
      start: false,
      timeZone: 'Europe/Prague'
    });
  }
}

module.exports = CronService;
