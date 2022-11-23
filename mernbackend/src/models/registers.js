const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeSchema =new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    mail : {
        type:String,
        required:true,
        
    },
    password1 : {
        type:String,
        required:true
    },
    cpassword1 : {
        type:String,
        required:true
    },
   
    
})


employeeSchema.pre("save",async function(next){

    if(this.isModified("password1")){
        //const passwordHash = await bcrypt.hash(passowrd, 10);
        console.log(`the current password is ${this.password1}`);
        this.password1 = await bcrypt.hash(this.password1, 10);
        console.log(`the current password is ${this.password1}`);

        this.cpassword1 = undefined;
         
    }
    next();
})
const Register = new mongoose.model("Register",employeeSchema);



module.exports=Register;