require('dotenv').config();
const express = require('express');
const {flash} = require('express-flash-message');
const methodoverride = require('method-override');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const session = require('express-session');


const app = express();
const PORT = 5000 || process.env.PORT;

//Connect to Database
connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodoverride(('_method')))

//static files
app.use(express.static('public'));

//Express Session
app.use(
    session({
        secret:'secret',
        resave:false,
        saveUninitialized:true,
        cookie:{
            maxAge:1000 * 60*60*24*7,
        }
    })
);

//Flash Message
app.use(flash({sessionKeyName:'flashMessage'}));

//Templating Engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

//ROUTE
app.use('/',require('./server/routes/customer'));
// app.get('/',(req,res)=>{
//     res.render('index')
// });

//404
app.get('*',(req,res)=>{
    res.status(404).render('404')
});

//APP LISTENING
app.listen(PORT,()=>{
    console.log(`Server is up on port: ${PORT}`)
})