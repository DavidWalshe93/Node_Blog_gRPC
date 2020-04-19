// Created by David Walshe on 19/04/2020

// KNEX Setup
const environment = process.env.ENVIRONMENT || "development";
const config = require("./knexfile")[environment];
const knew = require("knex")(config);
