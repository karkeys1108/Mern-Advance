const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Server is running at some point in the system");
    console.log("Request received");
});

server.listen(5001, () => {
    console.log("Server is running on port 5000");
});
