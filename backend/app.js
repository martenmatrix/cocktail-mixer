const cors = require('cors');
const dotenv = require('dotenv');
const result = dotenv.config({
  path: '../.env'
});
if (result.error) {
  throw result.error;
}
console.log(result.parsed);

const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const ip = require("ip");
const app = express();
app.use(bodyParser.json());
app.use(cors());

//import routes
const drinkRoute = require('./routes/drinks');
app.use('/drink', drinkRoute);
app.use(cors({origin: '*'}));

app.get('/status', (req, res) => {
    const response = {
        status: 'Idle'
    }
    res.send(response);
});

// get ip with -hostname I
// https://pimylifeup.com/raspberry-pi-static-ip-address/
const hostname = ip.address();
const port = process.env.BACKEND_PORT || 3000;

const server = app.listen(port, () =>{
    console.log('Server running at '+hostname+':'+port)
});
