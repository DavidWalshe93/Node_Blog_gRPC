// Created by David Walshe on 19/04/2020

// NPM imports
const grpc = require("grpc");
// Local imports
const utils = require("../utils/utils");

// Proto imports
const blogs = require("../proto_out/proto/blog_pb");
const service = require("../proto_out/proto/blog_grpc_pb");


// Helper method for getting a client connection for the server.
const getClientConnection = () => {
    return new service.BlogServiceClient(
        "localhost:50051",
        grpc.credentials.createInsecure()
    )
};


// Creates a new blog on the server DB
const createBlog = () => {
    const client = getClientConnection();

    // Create a blog to add data to.
    let blog = new blogs.Blog();

    // Add data to the blog protobuf.
    blog.setAuthor("Adam Flynn");
    blog.setTitle("Tales of Old");
    blog.setContent("Long ago in a distance land");

    // Create a blog create request.
    let blogRequest = new blogs.CreateBlogRequest();

    // Add blog data to request.
    blogRequest.setBlog(blog);

    // Send the request and wait for a response from the server.
    client.createBlog(blogRequest, (error, response) => {
        if (!error) {
            console.log("Received create blog response, ", response.toString());
        } else {
            console.log(error);
        }
    })
};


// Fetches all the blogs currently in the servers database.
const listBlogs = () => {
    const client = getClientConnection();

    // Create an empty request.
    let emptyBlogRequest = new blogs.ListBlogRequest();

    // Call the server RPC "listBlog"
    let call = client.listBlog(emptyBlogRequest, null);

    // On a stream packet being received.
    call.on("data", response => {
        console.log("Client Streaming Response ", response.getBlog().toString());
    });

    // Error, i.e. stream is down.
    call.on("error", error => {
        console.log(error);
    });

    // All data is received.
    call.on("end", () => {
        console.log("The end of the client messages")
    });
};


// Fetches a single blog from the server based on its id.
const readBlog = (id) => {
    const client = getClientConnection();

    // Create a request.
    let readBlogRequest = new blogs.ReadBlogRequest();

    readBlogRequest.setBlogId(`${id}`);

    // Call the server RPC "readBlog".
    client.readBlog(readBlogRequest, (error, response) => {
        if (!error) {
            console.log("Received read blog response, ", response.toString());
        } else {
            console.log(error);
        }
    });
};

// Updates a single blog in the DB on the server.
const updateBlog = (id) => {
    const client = getClientConnection();

    // Create a request.
    let updateBlogRequest = new blogs.UpdateBlogRequest();

    let blog = utils.blogFactory(blogs, {
        id: id,
        author: "Mick",
        title: "Tir Na Nog",
        content: "Old irish folk tales."
    });

    updateBlogRequest.setBlog(blog);

    client.updateBlog(updateBlogRequest, (error, response) => {
        if (!error) {
            console.log("Received update blog response, ", response.toString());
        } else {
            console.log(error);
        }
    })
};


// Client entry point.
const main = () => {
    // createBlog();
    // listBlogs();
    // readBlog(1);
    // readBlog(3);
    updateBlog(3)
};

main();