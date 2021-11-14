// @ts-check
const dotenv = require("dotenv");
const axios = require("axios");
const nodemailer = require("nodemailer");

dotenv.config();

const { gmailPassword, gmailUsername, gmailAddress } = require("./config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUsername,
    pass: gmailPassword,
  },
});

(async () => {
  const res = await axios.default.post(
    "http://postyafteh.post.ir/r/Handlers/SearchAllHandler.ashx",
    {
      fName: "محمد جواد",
      lName: "براتی",
      fatherName: "",
      nationalCode: "",
      type: "-1",
    }
  );

  if (res.data.data.length > 0) {
    /**@type {import('./matched-records').MatchedRecords[]} */
    const matchedRecords = res.data.data;
    for (let record of matchedRecords) {
      if (record.n === "گذرنامه") {
        await sendMail();
        break;
      }
    }
  }
})();

function sendMail() {
  const mailOptions = {
    from: gmailUsername,
    to: gmailAddress,
    subject: "your passport seems found",
    html: "<h1>check the <a href='http://postyafteh.post.ir/r/fSearchAll.aspx'>postyafteh</a> website</h1>",
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}
