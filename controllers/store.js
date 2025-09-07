const Favourite = require("../models/favourite");
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
  Favourite.getFavourites((favourites) => {
    Home.fetchAll((registeredHomes) => {
      const favwithDetails=favourites.map(homeId => registeredHomes.find(home => homeId === home.id));
      res.render("store/favourite" ,{
        favwithDetails:favwithDetails,
        pageTitle:"favourites",
      })
    });
  });
};
const getIndex = (req, res, next) => {
  const registeredHomes = Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "index",
    })
  );
};
const getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At Home-Details Page:", homeId);
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      console.log("Home Details found", home);
      res.render("store/home-detail", {
        home: home,
        pageTitle: "index",
      });
    }
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
  });
};
exports.postAddToFavourite = (req, res, next) => {
  console.log("Came to add to favourite", req.body);
  Favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while marking favourite:", error);
    }
    res.redirect("/favourite");
  });
};

exports.getHomes = getHomes;
// exports.getBookings = this.getBookings;
exports.getFavourite = getFavourite;
exports.getIndex = getIndex;
exports.getHomeDetails = getHomeDetails;
// exports.registeredHomes=registeredHomes;
