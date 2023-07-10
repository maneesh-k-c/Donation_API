const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/FoodDB?retryWrites=true&w=majority') 
const Schema = mongoose.Schema 

const BookSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     category:{ type: String, required: true },
     language:{ type: String, required: true },
     image:{ type: String, required: true }
})

var Bookdata = mongoose.model('book_tb',BookSchema) 
module.exports=Bookdata;