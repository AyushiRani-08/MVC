// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const {mongoConnect}=require('./utils/databaseUtil');
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
  res.status(404).render('404', {pageTitle: 'Page Not Found'});
})

const PORT = 3003;
// mongoConnect(() => {
//   app.listen(PORT, () => {
//   console.log(`Server running on address http://localhost:${PORT}`);
//   });
// })
mongoose.connect("mongodb+srv://root:root@ayushirani.fahzki9.mongodb.net/airbnb?retryWrites=true&w=majority&appName=AyushiRani").then(() => {
  console.log('Connected to mongoose');
   app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongooose', err); 
});