const mongoose = require("mongoose");
module.exports.dbConnection = () => {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("Db connection established");
    })
    .catch((err) => {
      console.log(err);
    });
};
