const express = require('express')
const register = require('../../model/registerData')
const login = require('../../model/loginData')
const UserRouter = express.Router()


UserRouter.get('/user-details',function(req, res){
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
                role: 2
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

UserRouter.get('/delete/:id',(req, res)=>{
    const id = req.params.id
    login.deleteOne({_id:id})
    .then(function(){
        register.deleteOne({login_id:id})
        .then(()=>{
            res.status(200).json({
                success:true,
                error:false,
                message:'User deleted!'
            })
        })
      
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
})

module.exports = UserRouter