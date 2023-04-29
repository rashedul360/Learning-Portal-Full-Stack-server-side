const homeController = (_req, res) => {
 res.status(200).json({
  message: "welcome",
 });
};
module.exports = homeController;
