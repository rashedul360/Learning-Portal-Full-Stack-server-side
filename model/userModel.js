const { Schema, model } = require("mongoose");
const userSchema = new Schema({
 id: String,
 name: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  required: true,
 },
 role: {
  type: [String],
  required: true,
  enum: ["ADMIN", "STUDENT", "EDITOR"],
 },
 status: {
  type: String,
  required: true,
 },
 password: {
  type: String,
  required: true,
 },
});
const user = model("learning_portal_user", userSchema);
module.exports = user;
