const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const showOnDisplay = require('./raspberry').showOnDisplay;
const activatePump = require('./raspberry').activatePump;
const checkPassword = require('./misc').checkPassword;
const getTask = require('./currentTask').getTask;
const pumpsJSONPATH = './data/pumps.json';

const result = dotenv.config({
  path: './.env'
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
    const status = getTask();
    res.status(200);
    res.send({
      task: status
    });
});

app.get('/pumps', (req, res) => {
    fs.readFile(pumpsJSONPATH, "utf8", (error, jsonString) => {
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
      const currentPumpStatus = JSON.parse(fs.readFileSync(pumpsJSONPATH, 'utf8'));
      const newPumpsArray = currentPumpStatus.pumps.map(pump => {
        if(pump.id === selectedPumpID) {
          pump.select = newSelection;
        }
        return pump;
      });

      fs.writeFile(pumpsJSONPATH, JSON.stringify({pumps: newPumpsArray}), (error) => {
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

app.post('/password', async (req, res) => {
  const response = checkPassword(req.body.password);
  res.status(200);
  res.send(response);
});


let lastRequests = [
  Promise.resolve(),
  Promise.resolve(),
  Promise.resolve(),
  Promise.resolve(),
  Promise.resolve(),
  Promise.resolve(),
  Promise.resolve(),
  Promise.resolve(),
];

app.post('/startPump', async (req, res) => {
    res.status(200);
    res.send({success: true});
    const pumpID = req.body.id;
    const timeInMs = req.body.time;

    const response = await Promise.race([lastRequests[pumpID - 1], 'loading']);
    if (response === 'loading') return;

    const promise = activatePump(pumpID, timeInMs);
    lastRequests[pumpID - 1] = promise;
});

// get ip with -hostname I
// https://pimylifeup.com/raspberry-pi-static-ip-address/
const hostname = ip.address();
const port = process.env.BACKEND_PORT || 3000;

const server = app.listen(port, () => {
    console.log('Server running at '+hostname+':'+port)
});