const {
 getPromoCodes,
 getSinglePromoCode,
 updatePromoCode,
 addPromoCode,
 deletePromoCode,
} = require("../../controler/promo_code_controllers/promo_code_controllers");
const { verifyUser } = require("../../middlewares/userVerification");
const verifyIsAdmin = require("../../middlewares/verifyIsAdmin");

const promoCodeRouter = require("express").Router();
promoCodeRouter.get("/promo_codes", verifyUser, getPromoCodes);
promoCodeRouter.post("/promo_code/:code", verifyUser, getSinglePromoCode);
promoCodeRouter.post("/promo_code", verifyIsAdmin, addPromoCode);
promoCodeRouter.patch("/promo_code", verifyIsAdmin, updatePromoCode);
promoCodeRouter.delete("/promo_code", verifyIsAdmin, deletePromoCode);
module.exports = promoCodeRouter;
