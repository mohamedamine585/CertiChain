const nodemailer = require("nodemailer");

const sendConfimationEmail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS,
    },
  });
  // saving the token and email to the database
  /*
    await Token.create({
      email,
      token,
    });
    */
  // send an email with token as query parameter
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Confirm Your Account",
    html: `Click <a href="http://localhost:3000/confirm-account?token=${token}">here</a> to confirm your account.`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendConfimationEmail;
