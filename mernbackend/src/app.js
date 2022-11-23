const express = require("express");
const path = require("path");
const app= express();
const hbs= require("hbs");
const bcrypt = require("bcryptjs");

require("./db/conn");

const Register = require("./models/registers");
const { json } = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public" );

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");

app.get("/",(req,res) => {
    res.render("index");
});

app.get("/game",(req,res) => {
    res.render("game");
});

app.post("/",async(req,res) =>{
    try{
        const password1 = req.body.password1;
        const cpassword1 = req.body.cpassword1;
        if(password1 === cpassword1){
            const registerEmployee = new Register({
                username: req.body.username,
                mail: req.body.mail,
                password1: req.body.password1,
                cpassword1: req.body.cpassword1
            })

            const registered = await registerEmployee.save();
            res.status(201).render("index");
        }else{
            res.send("password are not matching")
        }
    }catch(error){
        res.status(400).send(error);
    }
})

app.post("/game",async(req,res) => {
    try{

        const mail = req.body.mail;
        //const username = req.body.username;
        const password1 = req.body.password1;

        const useremail = await Register.findOne({mail:mail});
        //const useremail = await Register.findOne({username:username});
        
       const isMatch = await bcrypt.compare(password1,useremail.password1);
       // res.send("Hi");
        if(isMatch){
            res.status(201).render("game");
        }else{
            res.send("password are not matching");
        }
    }catch(error){
        res.status(400).send("invalid Email")
    }
});

app.listen(port, () =>{
    console.log(`server is running at port no ${port}`);
})