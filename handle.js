// import { checklang, extract, resp } from "./msgprocess";
const msgprocess = require("./msgprocess");
const request = require("request"),
  express = require("express"),
  { urlencoded, json } = require("body-parser"),
  app = express();
const { default: didYouMean, ReturnTypeEnums } = require("didyoumean2");
var config = require("./config.json");
const mqtt = require("mqtt");

const options = {
  port: config.mqtt.port,
  host: config.mqtt.host,
  username: config.mqtt.user,
  password: config.mqtt.pass,
};
const client = mqtt.connect(options);
client.on("connect", function () {
  console.log("MQTT Connected");
});
message = (config, senderPsid, receivedMessage, dict) => {
  console.log("msg");
  let response, act, dev, lang, lang1, lang2;
  if (receivedMessage.text || receivedMessage.quick_reply) {
    //*whitelist
    // if (true) {
    if (config.whitelist.includes(senderPsid)) {
      console.log("whitelist: true");
      [act, dev, lang1, lang2] = msgprocess.extract(config, receivedMessage);
      lang = msgprocess.checklang(lang1, lang2, receivedMessage);
      if (["turn_on", "turn_off", "toggle"].includes(act) && dev) {
        //*response
        response = {
          text: resp(config, act, dev, lang),
        };
        //*publish
        client.publish(config.device[dev]["topic"], config.device[dev][act + "_message"]);
      } else if (act === "settemp" && dev) {
        if (receivedMessage.text.match(/\d/g)) {
          let temp = receivedMessage.text.match(/\d/g).join("");
          console.log("temp: " + temp);
          client.publish(config.device[dev]["topic"], "cool" + temp);
          response = {
            text: msgprocess.resp(config, act, dev, lang),
          };
        } else {
          response = {
            text: "กรุณาระบุอุณหภูมิด้วย เช่น ปรับแอร์ 25",
          };
        }
      } else if (act === "setmode" && dev) {
        let mode;
        for (let [key, value] of Object.entries(["dry", "cool", "fan", "fan only", "แห้ง", "เย็น", "พัดลม"])) {
          receivedMessage.text.toLowerCase().includes(value) ? (mode = value) : null;
        }
        console.log("mode: " + mode);
        if (lang === "TH") {
          if (mode) {
            if (receivedMessage.text.match(/\d/g)) {
              let temp = receivedMessage.text.match(/\d/g).join("");
              console.log("temp: " + temp);
              if (mode === "แห้ง") {
                client.publish(config.device[dev]["topic"], "dry" + temp);
                response = {
                  text: msgprocess.resp(config, act, dev, lang),
                };
              } else if (mode === "เย็น") {
                client.publish(config.device[dev]["topic"], "cool" + temp);
                response = {
                  text: msgprocess.resp(config, act, dev, lang),
                };
              }
            } else if (mode === "พัดลม") {
              client.publish(config.device[dev]["topic"], "fan");
              response = {
                text: msgprocess.resp(config, act, dev, lang),
              };
            } else {
              response = {
                text: "กรุณาระบุโหมดแห้ง,เย็น,พัดลม และอุณหภูมิ เช่น ปรับโหมดแอร์แห้ง 25",
              };
            }
          } else {
            response = {
              text: "กรุณาระบุโหมดแห้ง,เย็น,พัดลม และอุณหภูมิ เช่น ปรับโหมดแอร์แห้ง 25",
            };
          }
        } else if (lang === "EN") {
          if (mode) {
            if (receivedMessage.text.match(/\d/g)) {
              let temp = receivedMessage.text.match(/\d/g).join("");
              console.log("temp: " + temp);
              if (mode === "dry") {
                client.publish(config.device[dev]["topic"], "dry" + temp);
                response = {
                  text: msgprocess.resp(config, act, dev, lang),
                };
              } else if (mode === "cool") {
                client.publish(config.device[dev]["topic"], "cool" + temp);
                response = {
                  text: msgprocess.resp(config, act, dev, lang),
                };
              }
            } else if (mode === "fan" || mode === "fan only") {
              client.publish(config.device[dev]["topic"], "fan");
              response = {
                text: msgprocess.resp(config, act, dev, lang),
              };
            } else {
              response = {
                text: "Please specify mode dry , cool , fan and temperature, e.g. mode air dry 25",
              };
            }
          } else {
            response = {
              text: "Please specify mode dry , cool , fan and temperature, e.g. mode air dry 25",
            };
          }
        }
      } else if (act === "detailDevice" && dev && lang) {
        if (lang === "TH") {
          response = {
            text: "ชื่ออุปกรณ์ : " + config.device[dev]["TH"][0] + "\n" + "topic : " + config.device[dev]["topic"] + "\n" + "ชื่อ : " + config.device[dev]["TH"],
          };
        } else if (lang === "EN") {
          response = {
            text: "Device name : " + config.device[dev]["EN"][0] + "\n" + "topic : " + config.device[dev]["topic"] + "\n" + "name : " + config.device[dev]["EN"],
          };
        }
      } else if (act === "help") {
        response = {
          text: config.responding[act][lang][0],
        };
      } else if (act === "command") {
        response = {
          text: config.responding[act][lang][0],
        };
      } else if (act === "maprang") {
        response = {
          text: config.responding[act][lang][0],
        };
      } else {
        if (Object.keys(config.responding).includes(act)) {
          console.log(config.responding[act][lang]);
          response = {
            text: config.responding[act][lang],
          };
        } else {
          console.log(
            "gress:" +
              didYouMean(receivedMessage.text, dict, {
                returnType: ReturnTypeEnums.ALL_CLOSEST_MATCHES,
              })
          );
          response = {
            text: config.responding.unknown[lang][0] + "'" + didYouMean(receivedMessage.text, dict) + "'",
            quick_replies: [
              {
                content_type: "text",
                title: didYouMean(receivedMessage.text, dict),
                payload: didYouMean(receivedMessage.text, dict),
              },
            ],
          };
        }
      }
    } else {
      response = { text: config.responding.no_permission };
    }
  }
  // Send the response message
  console.log("respones:", response);
  callSendAPI(config, senderPsid, response);
};

callSendAPI = (config, senderPsid, response) => {
  // Construct the message body
  let requestBody = {
    recipient: {
      id: senderPsid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: process.env.URI_MSG,
      qs: { access_token: config.auth.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: requestBody,
    },
    (err, _res, _body) => {
      if (!err) {
        console.log("Message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};

// export { message, callSendAPI };
module.exports = { message, callSendAPI };
