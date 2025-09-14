// Core Module
const path = require('path');

// External Module
const express = require('express');
const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);
const multer=require('multer');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter=require('./routes/authRouter')
const rootDir = require("./utils/pathUtil");
const {mongoConnect}=require('./utils/databaseUtil');
const mongoose = require('mongoose');
const DB_PATH="mongodb+srv://root:root@ayushirani.fahzki9.mongodb.net/airbnb?retryWrites=true&w=majority&appName=AyushiRani";
const errorsController = require("./controllers/errors");


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store=new MongoDBStore({
  uri:DB_PATH,
  collection:'sessions'
});

const storage=multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null,'uploads/');  
  },
  filename:(req,file,cb) => {
    cb(null,Date.now() + '-' + file.originalname);
  }
})
const fileFilter=(req,file,cb) => {
  if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
    cb(null,true);  
  }else{
    cb(null,false);
  }
}

app.use(express.urlencoded());
app.use(multer({storage,fileFilter}).single('photo')); //for parsing multipart/form-data
app.use(express.static(path.join(rootDir, 'public')));
app.use('/uploads',express.static(path.join(rootDir,'uploads'))); //to serve images statically
app.use('/host/uploads',express.static(path.join(rootDir,'uploads'))); //to serve images statically
app.use('/homes/uploads',express.static(path.join(rootDir,'uploads'))); //to serve images statically



app.use(session({
  secret:'Airbnb',
  resave:false,
  saveUninitialized:true,
  store:store,  //session stored in store else memory
}))
app.use((req,res,next) => {
  // console.log('cookie check middleware',req.get('Cookie'));
  req.isLoggedIn=req.session.isLoggedIn;
  next();
})
app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req,res,next) => {
  if(req.isLoggedIn){
    next();
  }else{
    res.redirect("/login");
  }
})
app.use("/host", hostRouter);


app.use(errorsController.pageNotFound);

app.use((req, res, next) => {
  res.status(404).render('404', {pageTitle: 'Page Not Found',isLoggedIn:req.isLoggedIn});
})

const PORT = 3001;
// mongoConnect(() => {
//   app.listen(PORT, () => {
//   console.log(`Server running on address http://localhost:${PORT}`);
//   });
// })
mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to mongoose');
   app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongooose', err); 
});