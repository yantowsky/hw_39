require('dotenv').config();

const http = require('node:http');

const port = process.env.APP_PORT || 3000;

const server = http.createServer();

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

server.on('request', (req, res) => {

    const second = randomInteger(1, 3);
    const percent = randomInteger(1, 10) * 10;
    
    console.log(second + " sec");
    console.log(percent + "%");
    
    function statusServer() {
        if (percent !== 10) {
            res.end(`Response to request in ${second} seconds`);
        } else {
            res.writeHead(500);
            res.end(`Server error ${second} seconds after request.`);
        }
    }

    setTimeout(() => {
        statusServer();
    }, second * 1000);
})

server.on('listening', () => {
    console.log(`Server is running on port: ${port}`);
});

server.listen(port);