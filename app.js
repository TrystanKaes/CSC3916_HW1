var server = require("http").createServer();

server.on("request", (request, response) => {
    var message;
    request.on("data", chunk => {
        console.log("request on data");
        message += chunk;
    });
    request
        .on("end", () => {
            console.log("request on end");
            let messageString = message.concat().toString();
            let failure = "It's done broke.";
            response.write(messageString);
            console.log(messageString);
            response.end(failure);
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

// curl -d "echo" -H "Content-Type: text" -X POST http://localhost:8008
