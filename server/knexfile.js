// Created by David Walshe on 19/04/2020

// Built-in Modules
const path = require("path");

// Env variables
const USERNAME = process.env.USERNAME;
const PW = process.env.PW;
const PORT = process.env.PORT;

// Setup for Postgres database connection.
module.exports = {
    development: {
        client: "postgresql",
        connection: {
            host: "127.0.0.1",
            user: USERNAME,
            password: PW,
            port: PORT,
            database: "grpc_blog",
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path.join(__dirname, "db", "migrations"),
        },
        seeds: {
            directory: path.join(__dirname, "db", "seeds"),
        }
    }
};