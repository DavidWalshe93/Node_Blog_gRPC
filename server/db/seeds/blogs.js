// Author: David Walshe
// Date: 19/04/2020

exports.seed = (knex) => {
    // Deletes ALL existing entries
    return knex('blogs').del()
        .then(function () {
            // Inserts seed entries
            return knex('blogs').insert([
                {author: "Mary", title: "Mary's Blog Post", content: "The Irish Banshee"},
                {author: "John", title: "John's Legends Blog", content: "Legends of Avalon"},
                {author: "Bob", title: "Bob's Norse Mythology post", content: "Odin Son, King of Asgard"},
            ]);
        });
};
