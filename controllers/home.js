const Home = require("../models/home");
const user = require("../models/user");
const getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user:req.session.user,
  });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then(home => {   //homes id arrays of rows
    // const home=homes[0];
    if (!home) {
      console.log("home not found for edit");
      return res.redirect("/host/host-homes-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your airbnb",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user:req.session.user,
    });
  });
};

const postAddHome = (req, res, next) => {
  const { houseName, price, location, rating,description } = req.body;
  console.log(houseName, price, location, rating,description);
  console.log(req.file);
  if(!req.file){
    return res.status(422).send('Attached file is not an image.');
  }
  const photo = '/uploads/' + req.file.filename;
  const home = new Home({houseName, price, location, rating, photo,description});
  home.save().then(() => {
    console.log('home saved successfully')
  });
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const {houseName, price, location, rating, photo,description,id} = req.body;
  Home.findById(id).then((home) => {
    home.houseName=houseName,
    home.price=price,
    home.location=location,
    home.rating=rating,
    home.description=description;
    if(req.file){
      home.photo=req.file.path;
    }
    home.save().then((result) =>{
      console.log('home updated :',result);
    })
    res.redirect("/host/host-home-list");
  }).catch(err =>{
    console.log("Error while finding home",err);
  })
  // const home = new Home(houseName, price, location, rating, photo,description,id);
  // home.save().then(result => {
  //   console.log('home updated :',result);
  // });
  
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete homeid", homeId);
    Home.findByIdAndDelete(homeId).then (() =>{
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log('Error while deleting ', error);
  })
};

const getHostHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes list",
      isLoggedIn: req.isLoggedIn,
      user:req.session.user,
    });
  });
};
exports.getAddHome = getAddHome;
exports.postAddHome = postAddHome;
exports.getHostHomes = getHostHomes;
// exports.registeredHomes=registeredHomes;
