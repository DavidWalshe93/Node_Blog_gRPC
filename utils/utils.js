// Created by David Walshe on 20/04/2020

// Helper to create and populate a Blog protobuf.
const blogFactory = (blogs, {id = null, author = null, title = null, content = null} = {}) => {
    let blog = new blogs.Blog();

    if (id)
        blog.setId(`${id}`);
    if (author)
        blog.setAuthor(author);
    if (title)
        blog.setTitle(title);
    if (content)
        blog.setContent(content);

    return blog
};

// Export functions.
module.exports = {
    blogFactory
};