const express = require("express");
const { dbConnection } = require("./config/dbConnection");
const appErorr = require("./utils/appErorr");
const GlobalMiddelWareErorr = require("./utils/globalMiddelwareErorr");
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors({}))
app.use("/",(req,res,next)=>{
    res.send('<h1>Home page</h1>')
})
app.use("/api/v1/users", require("./apis/user.api"));
app.use("/api/v1/drivers", require("./apis/driver.api"));

app.all("*", (req, res, next) => {

    return  next(new appErorr(`falied to find url :${req.originalUrl} on server`, 404))
   
})
app.use(GlobalMiddelWareErorr)
dbConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
