const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://userone:userone@database.wkagg.mongodb.net/FoodDB?retryWrites=true&w=majority') 
const Schema = mongoose.Schema 

const NotificationSchema = new Schema({
     buyer_id:{ type: Schema.Types.ObjectId, ref: "register_tb", required: true },
     seller_id:{ type: Schema.Types.ObjectId, ref: "register_tb", required: true },
     product_id:{ type: Schema.Types.ObjectId, required: true },
     status:{ type: String, required: true }, 
})

var Notificationdata = mongoose.model('notification_tb',NotificationSchema) 
module.exports=Notificationdata;