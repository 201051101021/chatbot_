dictgen = (config) => {
  var dict = [];
  let index = 0;
  for (let [key1, value1] of Object.entries(config.intent)) {
    // console.log(key1);
    for (let [key2, value2] of Object.entries(config.intent[key1])) {
      // console.log(key2);
      for (let [key3, value3] of Object.entries(config.intent[key1][key2])) {
        // console.log(value3);
        for (let [key11, value11] of Object.entries(config.device)) {
          // console.log(key11,key22);
          for (let [key33, value33] of Object.entries(config.device[key11]["TH"])) {
            // console.log(value3, value33)
            index < 5 ? (key2 == "TH" ? (key2 === "TH" ? dict.push(value3 + "" + value33) : dict.push(value3 + " " + value33)) : null) : null;
          }
          for (let [key33, value33] of Object.entries(config.device[key11]["EN"])) {
            // console.log(value3, value33)
            index < 5 ? (key2 == "EN" ? (key2 === "EN" ? dict.push(value3 + "" + value33) : dict.push(value3 + " " + value33)) : null) : null;
          }
        }
        index > 4 ? dict.push(value3) : null;
      }
    }
    index++;
  }
  console.log("dictionary loaded");
  // console.log(dict);
  return dict;
};

extract = (config, text) => {
  //check intent
  for (let [key1, value] of Object.entries(config.intent)) {
    for (let [key2, value] of Object.entries(config.intent[key1])) {
      for (let [key3, value] of Object.entries(config.intent[key1][key2])) {
        // console.log(key1,key2,key3,value);
        text.text.toLowerCase().includes(value) ? ((act = key1), (lang1 = key2)) : null;
      }
    }
  }
  //check device
  for (let [key1, value1] of Object.entries(config.device)) {
    for (let [key2, value2] of Object.entries(config.device[key1])) {
      for (let [key3, value3] of Object.entries(config.device[key1]["TH"])) {
        // console.log(key1,key2,key3,value3);
        // console.log(value1.name)
        text.text.toLowerCase().includes(value3) ? ((dev = key1), (lang2 = "TH")) : null;
      }
      for (let [key3, value3] of Object.entries(config.device[key1]["EN"])) {
        // console.log(key1,key2,key3,value3);
        // console.log(value1.name)
        text.text.toLowerCase().includes(value3) ? ((dev = key1), (lang2 = "EN")) : null;
      }
    }
  }
  console.log("intent: " + act);
  dev ? console.log("device: " + config.device[dev].name) : console.log("device: undefined");
  return [act, dev, lang1, lang2];
};

checklang = (lang1, lang2, text) => {
  //*check language
  lang1 != lang2 && act && dev ? (lang = "TH") : null;
  lang1 == "TH" && lang2 == "TH" ? (lang = "TH") : null;
  lang1 == "EN" && lang2 == "EN" ? (lang = "EN") : null;
  lang == null ? (/^[A-Za-z0-9]*$/i.test(text) ? (lang = "EN") : /^[ก-๚0-9]*$/i.test(text) ? (lang = "TH") : (lang = "TH")) : null;
  console.log("language: " + lang);
  return lang;
};

resp = (config, q, w, e) => {
  if (e == "TH") {
    return config.device[w][e][0] + "ของคุณถูก" + config.intent[q][e][0] + "แล้ว";
  } else if (e == "EN") {
    return "The " + config.device[w][e][0] + " is " + config.intent[q][e][0];
  } else if (e == "ENTH") {
    return "The " + config.device[w][e.slice(0, -2)][0] + " is " + config.intent[q][e.slice(0, -2)][0] + "\n" + config.device[w][e.slice(2)][0] + "ของคุณถูก" + config.intent[q][e.slice(2)][0] + "แล้ว";
  }
};
module.exports = { dictgen, extract, checklang, resp };
// export { dictgen, extract, checklang, resp };
