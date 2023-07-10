const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/FoodDB?retryWrites=true&w=majority') 
const Schema = mongoose.Schema 

const ClothSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     gender:{ type: String, required: true },
     type:{ type: String, required: true },
     quantity:{ type: String, required: true },
     image:{ type: String, required: true },
})

var Clothdata = mongoose.model('cloth_tb',ClothSchema) 
module.exports=Clothdata;