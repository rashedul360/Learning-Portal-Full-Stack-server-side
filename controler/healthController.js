const healthController = (_req, res) => {
 res.status(200).json({
  status: 200,
  message: "successfully found",
 });
};
module.exports = healthController;
