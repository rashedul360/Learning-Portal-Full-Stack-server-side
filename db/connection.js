require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xwnlkg2.mongodb.net/?retryWrites=true&w=majority`;
module.exports = uri;
