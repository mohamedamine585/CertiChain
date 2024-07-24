const Admin = require("../models/admin.model");
const generatePassword = require("../services/Authentication/generatePassword");
const createToken = require("../services/Authentication/createToken");
const sendNewPassword = require("../services/Authentication/sendNewPassword");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.login(email, password);
    const token = createToken(admin._id);
    console.log(admin);
    res.status(200).json({ email, token, id: admin._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const newPassword = generatePassword();

  try {
    await Admin.forgotPassword(email, newPassword);
    sendNewPassword(email, newPassword);
    res.status(200).json({ message: "Check your email !!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createAdmin = async (req, res) => {
  const newUserData = req.body;
  try {
    const customer = await Admin.signup(newUserData);
    const token = createToken(customer._id);

    res.status(200).json({
      message: "Admin created!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginAdmin, forgotPassword, createAdmin };
