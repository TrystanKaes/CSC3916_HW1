var server = require("http").createServer();

server.on("request", (request, response) => {
    var body = [];
    request.on("data", chunk => {
        body.push(chunk);
        // console.log(body);
    });
    request
        .on("end", () => {
            console.log("request on end");
            let bodyString = body.concat().toString();
            console.log(bodyString);
            // response.write(bodyString);
            response.end(bodyString);
        })
        .on("error", () => {
            console.log("request on error");
            response.statusCode = 400;
            response.end();
        });
    response.on("error", err => {
        console.log("response on error");
        console.error(err);
    });
});
server.listen(process.env.PORT, () => {
    console.log("Server listening at %s",process.env.PORT.toString());
});

module.exports = server; // for testing

//curl -d "echo" -H "Content-Type: text" -X POST http://localhost:8008
