const express= require('express');
const expressLayouts =require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app=express();
const port=process.env.port||3000;
require('dotenv').config();

//middlewares
app.use(express.urlencoded({extended:true}))
//middleware that is used when we upload some images or stylesheets or scripts
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());


app.set('layout','./layouts/main');
//set the default engine
app.set('view engine','ejs')

//routes
const routes=require('./server/routes/recipeRoutes.js');
app.use('/',routes)

app.listen(port,()=>console.log`Listening to port ${port}`)
