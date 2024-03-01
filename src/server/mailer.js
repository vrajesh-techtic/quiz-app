const generateEmailTemplate = require("./emailTemplate");
const cors = require("cors");

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
const port = 5000;

const email = "gamervd543@gmail.com";
const pwd = "yzhn wdhp pfhq xhyh";

function sendEmail(otp) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: pwd,
      },
    });
    // , techtic.jineshjain@gmail.com, techtic.harshvaishnav@gmail.com

    const mail_configs = {
      from: "gamervd543@gmail.com",
      to: "techtic.vrajesh@gmail.com, techtic.khushi@gmail.com, techtic.anuj@gmail.com, techtic.margish@gmail.com",
      subject: "Quizify OTP Verification",
      text: "Your OTP is ...",
      html: generateEmailTemplate(JSON.stringify(otp)),
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfully" });
    });
  });
}

app.post("/send-email", (req, res) => {
  sendEmail(req.body.randomOTP)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.get("/send-email/copy-otp/:otp", (req, res) => {
  const otp = req.params.otp;
  const script = `
    <script>
      const otpValue = '${otp}'; // Ensure otp is properly formatted
      navigator.clipboard.writeText(otpValue)
        .then(() => {
          console.log('OTP copied to clipboard:', otpValue);
          window.close();
        })
        .catch(error => {
          console.error('Failed to copy OTP:', error);
          // window.close(); // Close window even if copying fails
        });
    </script>
  `;

  res.send(script);
});

app.listen(port, () => {
  console.log("Mailer Server is running on port: " + port);
});
