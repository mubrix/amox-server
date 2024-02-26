const express = require ("express");
const server = express();
const User = require("./models/user.model");
const sequelize = require("./connection");
const {validateSignupData} = require("./validators/user.validator");
const port = process.env.PORT || 5001;

server.use(express.json({}));
server.use(express.urlencoded({ extended: false}));


server.get("/", function (req, res) {
    return res.status(200).json ({message: "amox server"});
});

server.post ("/signup", async function (req, res) {
    try{
        const {err} = validatorSignUpData(req.body);
        if (err) {
            return res.status(400).json({message: err.details[0].message});
        }
        const userAlreadyExit = await User.findOne({
            where:{
                email: req.body.email,
            },
        });
        if (userAlreadyExit)
        return res.status(400).json({message: "user Already Exit"});
    const user = await User.create(req.body);
    const token = user.generateToken();
    console.log();
    return res.status(200).json({
        message: "User created", token: token
    });
    } catch (err) {
        console.log(err.message);
    }
    
});
server.listen(port, async function () {
    console.log("server started on port " + port);

    try{
        await sequelize.sync({alter: true});
        await sequelize.authenticate();
        console.log("connection as been established successfully");
      
    }  catch(error){
        console.error("unable to connect to database", error);
    }
});