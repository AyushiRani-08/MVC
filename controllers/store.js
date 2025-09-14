// const favourite = require("../models/favourite");
// const Favourite = require("../models/favourite");
const Home = require("../models/home");
const User = require("../models/user");

const getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes list",
      isLoggedIn: req.isLoggedIn,
      user:req.session.user,
    });
  });
};
const getFavourite = async (req, res, next) => {
  const userId=req.session.user._id;
  const user=await User.findById(userId).populate('favourites');
  res.render("store/favourite", {
        favwithDetails: user.favourites,
        pageTitle: "favourites",
        isLoggedIn: req.isLoggedIn,
        user:req.session.user,
 } );
  // Favourite.find()
  //   .populate("homeId")
  //   .then((favourites) => {
  //     const favouriteHomes = favourites.map((fav) => fav.homeId);
  //     res.render("store/favourite", {
  //       favwithDetails: favouriteHomes,
  //       pageTitle: "favourites",
  //       isLoggedIn: req.isLoggedIn,
  //       user:req.session.user,
  //     });
  //   });
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
  console.log("Session Value:", req.session);
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "index",
      isLoggedIn: req.isLoggedIn,
      user:req.session.user,
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
        isLoggedIn: req.isLoggedIn,
        user:req.session.user,
      });
    }
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    isLoggedIn: req.isLoggedIn,
    user:req.session.user,
  });
};
exports.postAddToFavourite =async  (req, res, next) => {
  console.log("Came to add to favourite", req.body);
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user=await User.findById(userId);
  if(!user.favourites.includes(homeId) ){
    user.favourites.push(homeId);
    await user.save();
  }
    res.redirect("/favourite");
  // Favourite.findOne({ homeId: homeId })
  //   .then((fav) => {
  //     if (fav) {
  //       console.log("Already marked as favourite");
  //     } else {
  //       fav = new Favourite({ homeId });
  //       fav.save().then((result) => {
  //         console.log("Fav added:", result);
  //       });
  //     }
  //     res.redirect("/favourite");
  //   })
  //   .catch((err) => {
  //     console.log("error while marking favourite", err);
  //   });
  // const fav = new Favourite(homeId);
  // fav
  //   .save()
  //   .then((result) => {
  //     console.log("Fav added:", result);
  //   })
  //   .catch((err) => {
  //     console.log("Error while marking favourites:", err);
  //   .finally(() => {
  //     res.redirect("/favourite");
  //   });
};
exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if(user.favourites.includes(homeId)){
    user.favourites=user.favourites.filter(favId=>favId.toString()!==homeId.toString());
    await user.save();
  } 
  res.redirect("/favourite");
};
// exports.getHomeRules= (req,res,next) => {
//   if(!req.isLoggedIn){
//     return res.redirect('/login');
//   }
//   const homeId=req.params.homeId;
//   Home.findById(homeId).then(home => {
//     if(!home){  
//       console.log('Home not found');
//       return res.redirect('/homes');
//     } 
//     res.render('store/rules',{
//       pageTitle:'House Rules',
//       home:home,    
//       isLoggedIn:req.isLoggedIn,
//       user:req.session.user,
//     })
//   }).catch(err => {
//     console.log('Error while finding home for rules',err);
//     res.redirect('/homes');
//   }); 


exports.getHomes = getHomes;
// exports.getBookings = this.getBookings;
exports.getFavourite = getFavourite;
exports.getIndex = getIndex;
exports.getHomeDetails = getHomeDetails;
// exports.registeredHomes=registeredHomes;
