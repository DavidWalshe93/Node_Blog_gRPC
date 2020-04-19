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
            host: "localhost",
            user: "",     // postgres instance username.
            password: "", // postgres instance password.
            port: "5432",
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