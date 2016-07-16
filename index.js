'use strict';

const express = require('express');
const http = require('http');
const app = express();

const CasualEatersBot = require('./core/CasualEatersBot');

CasualEatersBot.run(false);
http.createServer(app).listen(process.env['PORT'] || 8080);
