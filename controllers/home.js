const Home = require("../models/home");
const getAddHome = (req, res, next) => {
  res.render("host/addHome", { pageTitle: "Add Home to airbnb" });
};

const postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();
  res.render("host/homeAdded", { pageTitle: "Home Added Successfully" });
};

exports.getAddHome = getAddHome;
exports.postAddHome = postAddHome;
// exports.registeredHomes=registeredHomes;
