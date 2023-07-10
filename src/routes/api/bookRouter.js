const express = require('express')
const BookRouter = express.Router()
const book = require('../../model/bookData')
const checkAuth = require("../../middleware/check-auth")
const multer = require("multer")


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload/books")
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name)
    }
})

var upload = multer({ storage: storage })

BookRouter.post('/upload-book', upload.single("file"), (req, res) => {
    return res.json("file uploaded")
})

BookRouter.post('/add-book', checkAuth, async(req, res) => {
    try{
        var item = {
            login_id: req.userData.userId,
            category: req.body.category,
            language: req.body.language,
            image:req.body.image 
        }
        if(item.login_id && item.category && item.language && item.image)
        {
            var data = book(item)
            data.save()
            return res.status(200).json({
                success: true,
                error: false,
                message: "Book Added Successfully!"
            })
        }
        else{
            return res.status(400).json({
                success: false,
                error: true,
                message: "All fields are required!"
            }) 
        }
       
    }
    catch(error){
        return res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong!"
        }) 
    }
  
})

BookRouter.get('/view-book', (req, res) => {
    book.find()
        .then(function (data) {
            if (data == 0) {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: "No Item Found!"
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

BookRouter.get('/view-user-book', checkAuth, (req, res) => {
    var id = req.userData.userId
    book.find({ login_id: id })
        .then(function (data) {
            if (data == 0) {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: "No Item Found!"
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

BookRouter.get('/edit/:id', (req, res) => {
    const id = req.params.id
    book.findOne({ _id: id })
        .then(function (data) {
            return res.status(200).json({
                success: true,
                error: false,
                message: data
            })
        })
})


BookRouter.post('/update-book', (req, res) => {
    var items = {
        category: req.body.category,
        language: req.body.language,
        id: req.body.id
    }
    book.updateOne({ _id: items.id }, { $set: items })
        .then(function () {
            book.find().then(function (bin) {
                res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Book Details updated!',

                })
            })

        })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
})


BookRouter.get('/delete-book/:id', (req, res) => {
    const id = req.params.id
    book.deleteOne({ _id: id })
        .then(function () {
            res.status(200).json({
                success: true,
                error: false,
                message: 'Item deleted!'
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Something went Wrong!"
            })
        })
})


module.exports = BookRouter