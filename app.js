// src/app.js
require('dotenv').config();
const express = require('express');
const taskController = require('./controllers/taskController');

const app = express();
app.use(express.json());

app.post('/task', taskController.handleTaskRequest);

module.exports = app;
