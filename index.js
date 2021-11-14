// @ts-check
const { createServer } = require("http");

require("dotenv").config();
const axios = require("axios");

const { sendMail } = require("./send-mail");

const { firstName, lastName, type } = require("./config");

setInterval(async () => {
  const res = await axios.default.post(
    "http://postyafteh.post.ir/r/Handlers/SearchAllHandler.ashx",
    {
      fName: firstName,
      lName: lastName,
      fatherName: "",
      nationalCode: "",
      type: "-1",
    }
  );

  if (res.data.data.length > 0) {
    /**@type {import('./matched-records').MatchedRecords[]} */
    const matchedRecords = res.data.data;
    for (let record of matchedRecords) {
      if (record.n === type) {
        await sendMail();
        break;
      }
    }
  }
}, 86400000);

createServer((req, res) => {
  res.write(`${firstName}\n`);
  res.write(`${lastName}\n`);
  res.write(`${type}\n`);
  res.end();
}).listen(3000);
