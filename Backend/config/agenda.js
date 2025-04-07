require('dotenv').config(); // 👈 This loads the .env file

const Agenda = require('agenda');
const mongoose = require('mongoose');

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: 'agendaJobs' },
  processEvery: '1 minute',
  maxConcurrency: 20,
});

module.exports = agenda;
