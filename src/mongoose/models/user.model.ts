import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uuid: String,
  name: { type: String, require: true },
  phone: { type: Number, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  roleType: { type: String, require: true },
  totalNotesCount: { type: Number, require: true },
});

const User = mongoose.model("user", userSchema);

export { User };
