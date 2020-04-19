// Created by David Walshe on 19/04/2020

// NPM imports
const grpc = require("grpc");

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

// Fetches all the blogs currently in the servers database.
const callListBlogs = () => {
    const client = getClientConnection();

    // Create an empty request.
    let emptyBlogRequest = new blogs.ListBlogRequest();

    // Call the server RPC "listBlog"
    let call = client.listBlog(emptyBlogRequest, () => {
    });

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


// Client entry point.
const main = () => {
    callListBlogs()
};

main();