const favourite = require("../models/favourite");
const Favourite = require("../models/favourite");
const Home = require("../models/home");

const getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes list",
    });
  });
};
const getFavourite = (req, res, next) => {
  Favourite.find()
    .populate("homeId")
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.homeId);
      res.render("store/favourite", {
        favwithDetails: favouriteHomes,
        pageTitle: "favourites",
      });
    });
  // Favourite.find().then((favourites) => {
  //   favourites = favourites.map((fav) => fav.homeId.toString());
  //   Home.find().then((registeredHomes) => {
  //     console.log(favourites, registeredHomes);
  //     const favwithDetails = registeredHomes.filter((home) =>
  //       favourites.includes(home._id.toString())
  //     );
  //     res.render("store/favourite", {
  //       favwithDetails: favwithDetails,
  //       pageTitle: "favourites",
  //     });
  //   });
  // });
};
const getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "index",
    });
  });
};
const getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    // const home=homes[0];
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
  const homeId = req.body.id;
  Favourite.findOne({ homeId: homeId })
    .then((fav) => {
      if (fav) {
        console.log("Already marked as favourite");
      } else {
        fav = new Favourite({ homeId });
        fav.save().then((result) => {
          console.log("Fav added:", result);
        });
      }
      res.redirect("/favourite");
    })
    .catch((err) => {
      console.log("error while marking favourite", err);
    });
  // const fav = new Favourite(homeId);
  // fav
  //   .save()
  //   .then((result) => {
  //     console.log("Fav added:", result);
  //   })
  //   .catch((err) => {
  //     console.log("Error while marking favourites:", err);
  //   })
  //   .finally(() => {
  //     res.redirect("/favourite");
  //   });
};
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete(homeId)
    .then((result) => {
      console.log("Favourite removed:", result);
    })
    .catch((err) => {
      console.log("Error while removing favourite:", err);
    })
    .finally(() => {
      res.redirect("/favourite");
    });
};

exports.getHomes = getHomes;
// exports.getBookings = this.getBookings;
exports.getFavourite = getFavourite;
exports.getIndex = getIndex;
exports.getHomeDetails = getHomeDetails;
// exports.registeredHomes=registeredHomes;
