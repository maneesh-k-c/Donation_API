const express = require('express')
const app = express()

const RegisterRouter = require('./src/routes/api/registerRouter')
const LoginRouter = require('./src/routes/api/loginRouter')
const UserRouter = require('./src/routes/api/userRouter')
const VolunteerRouter = require('./src/routes/api/volunteerRouter')
const ItemRouter = require('./src/routes/api/itemRouter')
const ClothRouter = require('./src/routes/api/clothRouter')
const BookRouter = require('./src/routes/api/bookRouter')
const NotificationRouter = require('./src/routes/api/notificationRouter')
app.use(express.json())
app.use(express.static('./public'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use(express.urlencoded({extended:true}))  

app.use('/api/register',RegisterRouter)
app.use('/api/login',LoginRouter)
app.use('/api/user',UserRouter)
app.use('/api/volunteer',VolunteerRouter)
app.use('/api/item',ItemRouter)
app.use('/api/cloth',ClothRouter)
app.use('/api/book',BookRouter)
app.use('/api/notification',NotificationRouter)


app.listen(6000,()=>{
    console.log('server started at port 5000')
})