const nodemailer = require("nodemailer");

const sendNewPassword = async (email, newPassword) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASS,
        },
      });
    
      // send an email with token as query parameter
      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Your new password",
        html: `<p> Here is your new password: <b>${newPassword}</b></p>`,
      };
      await transporter.sendMail(mailOptions);
}

module.exports = sendNewPassword;
