// Created by David Walshe on 19/04/2020

// NPM imports
const grpc = require("grpc");

// Proto imports
const blogs = require("../proto_out/proto/blog_pb");
const service = require("../proto_out/proto/blog_grpc_pb");

// KNEX Setup
const environment = process.env.ENVIRONMENT || "development";
const config = require("./knexfile")[environment];
const knex = require("knex")(config);


const createBlog = (call, cb) => {
    const blog = call.request.getBlog();

    knex("blogs").insert({
        author: blog.getAuthor(),
        title: blog.getTitle(),
        content: blog.getContent()
    }).then(() => {
        let id = blog.getId();
        let addedBlog = new blogs.Blog();

        // Set the blog response to be returned
        addedBlog.setId(id);
        addedBlog.setAuthor(blog.getAuthor());
        addedBlog.setTitle(blog.getTitle());
        addedBlog.setContent(blog.getContent());

        // Create a protobuf response object.
        let blogResponse = new blogs.CreateBlogResponse();

        // Add the blog message to the response.
        blogResponse.setBlog(addedBlog);

        console.log("Inserted Blog with ID: ", blogResponse.getId());

        // Send response to client
        cb(null, blogResponse)
    })
};


const listBlog = (call, cb) => {
    // Retrieve data from the Postgres database via a Promise.
    knex("blogs").then((data) => {
        data.forEach((element) => {
            // Create a Blog message and load it with DB data.
            let blog = new blogs.Blog();
            blog.setId(element.id);
            blog.setAuthor(element.author);
            blog.setTitle(element.title);
            blog.setContent(element.content);

            // Create and load a blog response
            let blogResponse = new blogs.ListBlogResponse();
            blogResponse.setBlog(blog);

            // write to the stream
            call.write(blogResponse)
        });

        // End the stream.
        call.end()
    })
};

const main = () => {
    const server = new grpc.Server();

    // Added RPC API Services to Server.
    server.addService(service.BlogServiceService, {
        createBlog: createBlog,
        listBlog: listBlog,
    });

    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();

    console.log("Server running on 127.0.0.1:50051")
};

main();