const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/FoodDB?retryWrites=true&w=majority')  //database connection
const Schema = mongoose.Schema    //schema definition

const FoodSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     food_name:{ type: String, required: true },
     food_category:{ type: String, required: true },
     quantity:{ type: String, required: true },
     exp_date:{ type: String, required: true }, 
     image:{ type: String, required: true } 
})

var Fooddata = mongoose.model('food_tb',FoodSchema) //model creation
module.exports=Fooddata;