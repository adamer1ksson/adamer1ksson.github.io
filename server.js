const http = require("http");
const fs = require("fs");
const path = require("path");

// Create the server
http.createServer((req, res) => {
    let filePath = "." + req.url;
    if (filePath == "./") {
        filePath = "./index.html";
    }

    // Determine content type (for serving CSS, HTML, etc.)
    const extname = path.extname(filePath);
    let contentType = "text/html";
    switch (extname) {
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
        case ".ico":
            contentType = "image/x-icon";
            break;
    }

    // Read the file and send the response
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == "ENOENT") {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<h1>404 Not Found</h1>", "utf-8");
            } else {
                res.writeHead(500);
                res.end("Server error: " + error.code);
            }
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf-8");
        }
    });
}).listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
