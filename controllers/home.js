const Home = require("../models/home");
const getAddHome = (req, res, next) => {
  res.render("host/editHome", { pageTitle: "Add Home to airbnb" ,
    editing:false,
  },

  );
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("home not found for edit");
      return res.redirect("/host/host-homes-list");
    }
    console.log(homeId, editing,home);
    res.render("host/editHome", {
      home:home,
      pageTitle: "Edit your airbnb",
      editing: editing,
    });
  });
};


const postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();
  res.render("host/homeAdded", { pageTitle: "Home Added Successfully" });
};

exports.postEditHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl,id } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id=id;
  home.save();
  res.redirect("/host/host-home-list");
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
exports.getHostHomes = getHostHomes;
// exports.registeredHomes=registeredHomes;
