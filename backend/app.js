const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
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

function checkPassword(password) {
  const response = {
    correct: false
  }
  const validPassword = process.env.SETTINGS_PASSWORD;
  
  if (validPassword === password) {
    response.correct = true;
  }

  return response;
}

app.get('/status', (req, res) => {
    const response = {
        task: 'Idle'
    }
    
    res.status(200);
    res.send(response);
});

app.get('/pumps', (req, res) => {
    fs.readFile("../data/pumps.json", "utf8", (error, jsonString) => {
      if (error) {
        res.status(500);
        res.send({ error: error.message });
        return;
      }
      res.status(200);
      res.send(jsonString);
    });
});

app.patch('/setPump', (req, res) => {
    const response = {
      success: false,
    }

    const password = req.body.password;
    const selectedPumpID = req.body.pump;
    const newSelection = req.body.newSelection;
    
    if (!(password || selectedPumpID || newSelection)) {
        res.status(500);
        const passedParameters = JSON.stringify({password, pump: selectedPumpID, newSelection});
        res.send({ error: `Wrong parameters ${passedParameters}` });
        return;
    };

    if(checkPassword(password).correct) {
      const currentPumpStatus = JSON.parse(fs.readFileSync('../data/pumps.json', 'utf8'));
      const newPumpsArray = currentPumpStatus.pumps.map(pump => {
        if(pump.id === selectedPumpID) {
          pump.select = newSelection;
        }
        return pump;
      });

      fs.writeFile("../data/pumps.json", JSON.stringify({pumps: newPumpsArray}), (error) => {
        if (error) {
          res.status(500);
          res.send({ error: error.message });
          return;
        }
        res.status(200);
        response.success = true;
        res.send(response);
      });
    } else {
      res.status(401);
      res.send(response);
    }
});

app.post('/password', (req, res) => {
  const response = checkPassword(req.body.password);
  res.status(200);
  res.send(response);
});

// get ip with -hostname I
// https://pimylifeup.com/raspberry-pi-static-ip-address/
const hostname = ip.address();
const port = process.env.BACKEND_PORT || 3000;

const server = app.listen(port, () => {
    console.log('Server running at '+hostname+':'+port)
});
