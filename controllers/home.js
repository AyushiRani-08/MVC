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


const getHostHomes = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes list",
    })
  );
};
exports.getAddHome = getAddHome;
exports.postAddHome = postAddHome;
exports.getHostHomes=getHostHomes;
// exports.registeredHomes=registeredHomes;
