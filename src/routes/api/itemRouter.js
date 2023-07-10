const express = require('express')
const ItemRouter = express.Router()
const food = require('../../model/foodData')
const checkAuth = require("../../middleware/check-auth")
const multer = require("multer")


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload/food")
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name)
    }
})

var upload = multer({ storage: storage })

ItemRouter.post('/upload-food', upload.single("file"), (req, res) => {
    return res.json("file uploaded")
})


ItemRouter.post('/add-food', (req, res) => {
    var item = {
        login_id: req.body.userId,
        food_name: req.body.food_name,
        food_category: req.body.category,
        quantity: req.body.quantity,
        exp_date: req.body.date,
        image: req.body.image
    }
    console.log(item)
    var data = food(item)
    data.save()
    return res.status(200).json({
        success: true,
        error: false,
        message: "Food Added Successfully !"
    })
})

ItemRouter.get('/view-food', (req, res) => {
    food.find()
        .then(function (data) {
            if (data == 0) {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: "No Food Item Found!"
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    error: false,
                    data: data
                })
            }
        })

})

ItemRouter.get('/view-user-food', checkAuth, (req, res) => {
    var id = req.userData.userId
    food.find({ login_id: id })
        .then(function (data) {
            if (data == 0) {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: "No Food Item Found!"
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    error: false,
                    data: data
                })
            }
        })

})

ItemRouter.get('/edit/:id', (req, res) => {
    const id = req.params.id
    food.findOne({ _id: id })
        .then(function (data) {
            return res.status(200).json({
                success: true,
                error: false,
                message: data
            })
        })
})


ItemRouter.post('/update-food', (req, res) => {
    var items = {
        food_name: req.body.food_name,
        food_category: req.body.category,
        quantity: req.body.quantity,
        exp_date: req.body.date,
        id: req.body.id
    }
    food.updateOne({ _id: items.id }, { $set: items })
        .then(function () {
            food.find().then(function (bin) {
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Food Details updated!',

                })
            })

        })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
})


ItemRouter.get('/delete-food/:id', (req, res) => {
    const id = req.params.id
    food.deleteOne({ _id: id })
        .then(function () {
            res.status(200).json({
                success: true,
                error: false,
                message: 'Food deleted!'
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
})


module.exports = ItemRouter