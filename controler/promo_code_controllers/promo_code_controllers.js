const promoCode = require("../../model/promoCodeModel");
const { v4: uuidv4 } = require("uuid");
//==================================//get promo codes//===================================
const getPromoCodes = (_req, res, next) => {
 promoCode
  .find()
  .then((codes) =>
   codes !== null
    ? res
       .status(200)
       .json({ codes, status: 200, message: "successfully get all promo code" })
    : res.status(404).json({ message: "promo code not found", status: 404 })
  )
  .catch((err) => next(err));
};
//==================================//get a promo code//===================================
const getSinglePromoCode = (req, res, next) => {
 const { code } = req.params || {};
 if (code) {
  return promoCode
   .findOne({ promo_code: code })
   .then((promoCode) =>
    promoCode !== null
     ? res.status(200).json({ code: promoCode, status: 200 })
     : res.status(404).json({ message: "invalid code", status: 404 })
   )
   .catch((err) => next(err));
 }
 return res.status(400).json({ message: "bad request", status: 400 });
};
//==================================//add a promo codes//===================================
const addPromoCode = (req, res, next) => {
 const { code, discount, status } = req.body;
 if (code && discount) {
  const newPromoCode = new promoCode({
   id: uuidv4(),
   promo_code: code,
   status,
   discount,
  });
  return newPromoCode
   .save()
   .then((data) =>
    res.json({
     message: "promo code saved successfully",
     code: data,
     status: 200,
    })
   )
   .catch((err) => next(err));
 }
 return res.json(400).json({ message: "bad request", status: 400 });
};
//==================================//update promo code//===================================
const updatePromoCode = (req, res, next) => {
 const { id, code, updatedCode, status, discount } = req.body || {};
 // id: promo code id
 // code: code is current promo code
 // updatedCode:  replace code by updatedCode
 if (id && code && updatedCode && discount) {
  promoCode
   .findOneAndUpdate(
    { id, promo_code: code },
    {
     $set: {
      promo_code: updatedCode,
      status,
      discount,
     },
    },
    { timestamps: true, returnDocument: "after" }
   )
   .then((code) =>
    code !== null
     ? res.status(200).json({ code, status: 200 })
     : res.status(404).json({ message: "not found promo code", status: 404 })
   )
   .catch((err) => next(err));
 }
};
//==================================//delete promo code//===================================
const deletePromoCode = (req, res, next) => {
 const { id } = req.body || {};
 promoCode
  .findOneAndDelete({ id })
  .then((code) =>
   code !== null
    ? res.status(200).json({ message: "successfully deleted", status: 200 })
    : res.status(404).json({ message: "code not found", status: 404 })
  )
  .catch((err) => next(err));
};
module.exports = {
 getPromoCodes,
 getSinglePromoCode,
 addPromoCode,
 updatePromoCode,
 deletePromoCode,
};
