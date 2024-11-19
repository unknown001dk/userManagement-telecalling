import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, required: true },
  notes: String,
});

const User = mongoose.model("User", userSchema);

export default User;
