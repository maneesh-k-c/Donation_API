const express = require('express')
const register = require('../../model/registerData')
const bcrypt = require('bcryptjs')
const login = require('../../model/loginData')
const VolunteerRouter = express.Router()


VolunteerRouter.post('/add', (req, res) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'password hashing error'
            })
        }
        let logindata = {
            username: req.body.username,
            password: hashedPass,
            role: 1
        }
        login.findOne({ username: req.body.username })
            .then(username => {
                if (username) {
                    return res.status(400).json({
                        success: false,
                        error: true,
                        message: 'username already exist!'
                    })
                }
                else {
                    var item = login(logindata)
                    item.save()
                        .then(() => {
                            login.findOne({ username: logindata.username })
                                .then(function (details) {
                                    var id = details._id
                                    let registerdata = {
                                        login_id: id,
                                        name: req.body.name,
                                        address: req.body.address,
                                        phone: req.body.phone
                                    }
                                    register.findOne({ phone: registerdata.phone })
                                        .then((mobile) => {
                                            if (!mobile) {
                                                var register_item = register(registerdata)
                                                register_item.save()
                                                    .then(() => {
                                                        res.status(200).json({
                                                            success: true,
                                                            error: false,
                                                            message: 'New Volunteer Added'
                                                        })
                                                    })

                                            }
                                            else {
                                                console.log(id)
                                                login.deleteOne({ _id: id })
                                                    .then(() => {

                                                        res.status(401).json({
                                                            success: false,
                                                            error: true,
                                                            message: 'Mobile number is already registered with us'
                                                        })


                                                    })

                                            }
                                        })


                                })

                        })

                }

            })
    })

})

VolunteerRouter.get('/volunteer-details',function(req, res){
    login.aggregate([
        {
            $lookup:
            {
                from:'register_tbs',
                localField:'_id',
                foreignField:'login_id',
                as:'registerData'
            }         
        },
        {
            $match:
            { 
                role: 1
            }
         }
    ]).then(function(data){
            
        res.status(200).json({
            success:true,
            error:false,
            details:data
        })
    }) 
})

VolunteerRouter.get('/delete/:id',(req, res)=>{
    const id = req.params.id
    login.deleteOne({_id:id})
    .then(function(){
        register.deleteOne({login_id:id})
        .then(()=>{
            res.status(200).json({
                success:true,
                error:false,
                message:'Volunteer deleted!'
            })
        })
      
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
})

module.exports = VolunteerRouter