const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/FoodDB?retryWrites=true&w=majority')  //database connection
const Schema = mongoose.Schema    //schema definition

const RegisterSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     name:{ type: String, required: true },
     address:{ type: String, required: true },
     phone:{ type: Number, required: true } 
})

var Registerdata = mongoose.model('register_tb',RegisterSchema) //model creation
module.exports=Registerdata;