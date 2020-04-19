proto_out=".\proto_out"

protoc -I=. ./proto/blog.proto --js_out=import_style=commonjs,binary:"$proto_out" --grpc_out="$proto_out" --plugin=protoc-gen-grpc="$(which grpc_tools_node_protoc_plugin)"
