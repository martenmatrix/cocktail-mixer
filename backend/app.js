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
const express = require('express');
const ip = require("ip");
const app = express();
app.use(express.json());
app.use(cors());

//import routes
const drinkRoute = require('./routes/drinks');
app.use('/drink', drinkRoute);
app.use(cors({origin: '*'}));

app.get('/status', (req, res) => {
    const response = {
        task: 'Idle'
    }
    
    res.status(200);
    res.send(response);
});

app.post('/password', (req, res) => {
  const response = {
    correct: false
  }
  const validPassword = process.env.SETTINGS_PASSWORD;
  const sentPassword = req.body.password;
  
  if (validPassword === sentPassword) {
    response.correct = true;
  }

  res.status(200);
  res.send(response);
});

// get ip with -hostname I
// https://pimylifeup.com/raspberry-pi-static-ip-address/
const hostname = ip.address();
const port = process.env.BACKEND_PORT || 3000;

const server = app.listen(port, () =>{
    console.log('Server running at '+hostname+':'+port)
});
