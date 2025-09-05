const Home = require("../models/home");

const getHomes = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes list",
    })
  );
};
const getFavourite = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/favourite", {
      registeredHomes: registeredHomes,
      pageTitle: "My favourites",
    })
  );
};
const getIndex = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "index",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
  });
};

exports.getHomes = getHomes;
exports.getBookings=this.getBookings;
exports.getFavourite=getFavourite;
exports.getIndex=getIndex;
// exports.registeredHomes=registeredHomes;
