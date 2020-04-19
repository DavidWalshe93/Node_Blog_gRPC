// Author: David Walshe
// Date: 19/04/2020

// Creates a table "blogs", with 3 fields.
exports.up = (knex, Promise) => {
    return knex.schema.createTable("blogs", (table) => {
        table.increments();
        table.string("author").notNullable();
        table.string("title").notNullable();
        table.string("content").notNullable();
    })
};

// Drops the blogs table.
exports.down = function (knex) {
    return knex.schema.dropTable("blogs")
};