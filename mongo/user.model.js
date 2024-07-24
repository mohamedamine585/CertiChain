const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String },
  },
  { timestamps: true }
);

adminSchema.statics.signup = async function ({
  adminId,
  firstName,
  lastName,
  email,
  password,
}) {
  // validation
  if (!firstName || !lastName || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already existes");
  }

  // create salt which added to the end of the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    adminId,
    firstName,
    lastName,
    email,
    password: hash,
  });

  return user;
};

// static login method
adminSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect email or password");
  }

  return user;
};

// forgot password
adminSchema.statics.forgotPassword = async function (email, password) {
  if (!email) {
    throw Error("Your email must be provided");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }

  const exists = await this.findOne({ email });
  console.log(exists);
  if (!exists) {
    console.log("errrror");
    throw Error("Your email is not exist !!");
  }

  // create salt which added to the end of the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.updateOne({ email, password: hash });
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
