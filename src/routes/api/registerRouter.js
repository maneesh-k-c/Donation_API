const express = require('express')
const RegisterRouter = express.Router()
const bcrypt = require('bcryptjs')
const register = require('../../model/registerData')
const login = require('../../model/loginData')

RegisterRouter.post("/", async (req, res) => {   
    try {

      const oldUser = await login.findOne({ username:req.body.username });  
      if (oldUser) {
        return res.status(400).json({ success:false, error:true, message: "User already exists" });
      }  
     
      const hashedPassword = await bcrypt.hash(req.body.password, 12);   
      const oldphone = await register.findOne({ phone:req.body.phone }); 
      if (oldphone) {
        return res.status(400).json({ success:false, error:true, message: "Phone number already exists" });
      } 
      let log = {
        username: req.body.username,
        password: hashedPassword,
        role: 2
    }
      const result = await login(log).save()
      let reg = {
        login_id: result._id,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    }
      const result2 = await register(reg).save()
      if(result2){
        res.status(201).json({ success:true, error:false, message:"Registration completed", details:result2});
      }
      
    } catch (error) {
      res.status(500).json({ success:false, error:true, message: "Something went wrong" });
      console.log(error);
    }
  }
);





module.exports = RegisterRouter



