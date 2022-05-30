require("dotenv").config();
const fs = require("fs");
const LZString = require("./lz");
var config = require("./config.json");
// const options = {
//   port: config.mqtt.port,
//   host: config.mqtt.host,
//   username: config.mqtt.user,
//   password: config.mqtt.pass,
// };
// const client = mqtt.connect(options);
// client.on("connect", function () {
//   console.log("MQTT Connected");
// });
const path = require("path");
const { decompressFromBase64 } = require("./lz");
const request = require("request"),
  express = require("express"),
  { urlencoded, json } = require("body-parser"),
app = express();
const msgprocess = require('./msgprocess');
const handle = require('./handle');
var dict = msgprocess.dictgen(config);
// import { dictgen } from "./msgprocess";
// import { message } from "./handle";

app.use(urlencoded({ extended: true }));
app.use(json());
app.listen(process.env.PORT || 3000, () => console.log("webhook is listening"));
app.get("/config", function (_req, res) {
  res.sendFile(path.join(__dirname + "/config.html"));
});
app.get("/config/data/*", function (_req, res) {
  var data = _req.params[0];
  // console.log(data);
  res.send("saved successful<br>you can close this page");
  if (data) {
    var data_ = data.split(" ").join("+");
    var json = JSON.parse(LZString.decompressFromBase64(data_));
    let dataJson = JSON.stringify(json, null, 2);
    // console.log(json);
    fs.writeFileSync("config.json", dataJson, (err) => {
      if (err) throw err;
      console.log(err);
    });
  }
});
app.get("/read", function (_req, res) {
  fs.readFile("config.json", (err, data) => {
    if (err) throw err;
    let json = JSON.parse(data);
    console.log(json);
    res.send(json);
  });
});
app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  if (mode && token) {
    if (mode === "subscribe" && token === config.auth.VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});
app.post("/webhook", (req, res) => {
  let body = req.body;
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhookEvent = entry.messaging[0];
      let senderPsid = webhookEvent.sender.id;
      console.log("Sender PSID: " + senderPsid);
      if (webhookEvent.message) {
        handle.message(config, senderPsid, webhookEvent.message, dict);
        console.log(webhookEvent.message);
      }
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});
// msgprocess.dictgen(config);
// console.log(config)
