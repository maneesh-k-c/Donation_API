const express = require('express')
const NotificationRouter = express.Router()
const notification = require('../../model/notificationData')
const register = require('../../model/registerData')
const login = require('../../model/loginData')
const checkAuth = require("../../middleware/check-auth")


NotificationRouter.get('/add-notification', checkAuth, (req, res) => {
    var data = {
        buyer_id: req.userData.userId,
        seller_id: req.query.login_id,
        product_id: req.query.product_id,
        status:0 
    }
    console.log(data)
    var item = notification(data)
    item.save()
    return res.status(200).json({
        success: true,
        error: false,
        message: "Success!"
    })
})

 

NotificationRouter.get('/vol-notification', (req, res) => {
    notification.aggregate([
        {
            $lookup:
            {
                from: 'register_tbs',
                localField: 'buyer_id',
                foreignField: 'login_id',
                as: 'buyerData'
            }
        },
        {
            $lookup:
            {
                from: 'register_tbs',
                localField: 'seller_id',
                foreignField: 'login_id',
                as: 'sellerData'
            }
        },
        {
            $lookup:
            {
                from: 'food_tbs',
                localField: 'product_id',
                foreignField: '_id',
                as: 'foodData'
            }
        },
        {
            $lookup:
            {
                from: 'cloth_tbs',
                localField: 'product_id',
                foreignField: '_id',
                as: 'clothData'
            }
        },
        {
            $lookup:
            {
                from: 'book_tbs',
                localField: 'product_id',
                foreignField: '_id',
                as: 'bookData'
            }
        }
    ]).then((details) => {
        res.json({
            data: details,

        })


    })

})


NotificationRouter.get('/view-user-notification',checkAuth, (req, res) => {
    const id = req.userData.userId
    console.log(id)
    notification.aggregate([
        {
            $lookup:
            {
                from: 'register_tbs',
                localField: 'seller_id',
                foreignField: 'login_id',
                as: 'sellerData'
            }
        },
        {
            $lookup:
            {
                from: 'register_tbs',
                localField: 'buyer_id',
                foreignField: 'login_id',
                as: 'buyerData'
            }
        },
        {
            $lookup:
            {
                from: 'cloth_tbs',
                localField: 'product_id',
                foreignField: '_id',
                as: 'clothData'
            }
        },
        {
            $lookup:
            {
                from: 'food_tbs',
                localField: 'product_id',
                foreignField: '_id',
                as: 'foodData'
            }
        },
        {
            $lookup:
            {
                from: 'book_tbs',
                localField: 'product_id',
                foreignField: '_id',
                as: 'bookData'
            }
        }
        
    ]).then((details) => {
        res.json({
            data: details,

        })


    })

})


NotificationRouter.get('/vol-accept/:id',(req,res)=>{
    const id = req.params.id
    notification.updateOne({_id:id},{$set:{status:1}})
    .then(()=>{
            res.status(200).json({
            success:true,
            error:false,
            message:'accepted',
        
        })
    })
    
})


module.exports = NotificationRouter