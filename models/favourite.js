const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const FavouriteDataPath = path.join(rootDir, "data", "favourite.json");


module.exports = class Favourite {

  static addToFavourite(homeId,callback){
    Favourite.getFavourites((favourites) => {
          if(favourites.includes(homeId)){
            callback("home is already marked favourite");
          }else{
            favourites.push(homeId);
            fs.writeFile(FavouriteDataPath,JSON.stringify(favourites),callback);
          }
    });

  }
  static getFavourites(callback){
    fs.readFile(FavouriteDataPath, (err, data) => {
          callback(!err ? JSON.parse(data) : []);
     });
  }
  
}
  

