const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const login = require('../../model/loginData')
const register = require('../../model/registerData')
const nodemailer = require('nodemailer')
const LoginRouter = express.Router()




// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     // service:'gmail',
//     auth: {
//       user: "emailtester167@gmail.com",
//       password: "tester@123.",
//     },
//     secure: false,
//   });
const transporter2 = nodemailer.createTransport({
  host: "smtp.gmail.com",
      port: 465,
  debug: true,
  secure: true, 
  auth: {
    user: "emailtester167@gmail.com",
          password: "tester@123.",
  },
});
  
  // Define a function to send an email
  const sendEmail = async (to, subject, text) => {
    // const mailOptions = {
    //   from: "maneesh.maitexa@gmail.com",
    //   to,
    //   subject,
    //   text,
    // };

    const mailOptions = {
        from: "sender@example.com",
        to: "recipient@example.com",
        subject: "Hello from Node.js",
        text: "This is a plain text email.",
      };
  
    try {
      const message = await transporter2.sendMail(mailOptions);
      console.log("Email sent successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  
  // Create a route to send an email
  LoginRouter.post("/send-email", async (req, res) => {
    const to = req.body.to;
    const subject = req.body.subject;
    const text = req.body.text;
  
    await sendEmail(to, subject, text);
  
    res.status(200).json({ message: "Email sent successfully!" });
  });





















// const config = {
    
//     'service':"gmail",
//     'host':"smtp.gmail.com",
//     'port':587,
//     'secure':false,
//     'auth':{
//         'user':"amithkkt@gmail.com",
//         'pass':"amith@12345"
//     }
// }

// const send =(data)=>{
//     const transporter=nodemailer.createTransport(config)
//     transporter.sendMail(data,(err,info)=>{
//         if(err){
//             console.log(err);
//         }else{
//             return info.response
//         }
//     })
// }


// const data = {
//     'from':"nodemailer@gmail.com",
//     'to':"maneesh.maitexa@gmail.com",
//     'subject':"Thank you",
//     'text':"hello"
// }

// LoginRouter.post('/mail',async(req,res)=>{
//     const {from,to,subject,text}= req.body
//     const data ={from,to,subject,text}
//     const r = await nodemailer.sendMail(data )
//     res.json({
//         data:r
//     })
// })

LoginRouter.post("/", async (req, res) => {
    const { username, password } = req.body;
    try {
        if (username && password) {
            const oldUser = await login.findOne({ username })
            if (!oldUser) return res.status(404).json({ success: false, error: true, message: "User doesn't Exist" })
            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
            if (!isPasswordCorrect) return res.status(400).json({ success: false, error: true, message: "Incorrect password" })
            const token = jwt.sign(
                { userId: oldUser._id, userRole: oldUser.role },
                "secret_this_should_be_longer",
                { expiresIn: "1h" }
            )
            console.log("token", token);
            return res.status(200).json({ success: true, error: false, token: token, expiresIn: 3600, loginId: oldUser._id, userRole: oldUser.role })
        }
        else {
            return res.status(400).json({ success: false, error: true, message: "All fields are required!" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports = LoginRouter