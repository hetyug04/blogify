import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please Provide Name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: " Please Provide A Valid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    unique: true,
    minlength: 4,
  },
  dateJoined: {
    type: String,
  },
  followers: {
    type: [String],
    default: [],
  },
});
UserSchema.pre("save", async function () {
  // (this.modifiedPaths())
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.dateJoined = today;
  this.followers = 0;
});
UserSchema.methods.comparePassword = function (candidatePassword) {
  const isMatch = bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
