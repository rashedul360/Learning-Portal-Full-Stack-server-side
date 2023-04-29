const { Schema, model } = require("mongoose");

const promoCodeModel = new Schema({
 id: {
  type: String,
  required: true,
 },
 promo_code: {
  type: String,
  required: true,
 },
 discount: {
  type: Number,
  required: true,
 },
 status: {
  type: String,
  required: true,
 },
});

const promoCode = model("learning_portal_promo_code", promoCodeModel);
module.exports = promoCode;
