// Created by David Walshe on 19/04/2020

// NPM imports
const grpc = require("grpc");

// Proto imports
const blog = require("../proto_out/proto/blog_pb");
const service = require("../proto_out/proto/blog_grpc_pb");

// KNEX Setup
const environment = process.env.ENVIRONMENT || "development";
const config = require("./knexfile")[environment];
const knew = require("knex")(config);

const main = () => {
    const server = new grpc.Server();

    server.addService(service.BlogServiceService, {});

    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();

    console.log("Server running on 127.0.0.1:50051")
};

main();