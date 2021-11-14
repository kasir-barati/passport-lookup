// @ts-check
const nodemailer = require("nodemailer");

const { gmailPassword, gmailUsername, gmailAddress } = require("./config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUsername,
    pass: gmailPassword,
  },
});

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

module.exports = {
  sendMail,
};
