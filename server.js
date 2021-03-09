const express = require('express');
const inquirer = require('inquirer');
const sequelize = require('sequelize');

const port = process.env.port || 3000;

const app = express();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});