// const fs = require("fs");
// const path = require("path");
// const rootDir = require("../utils/pathUtil");
// const FavouriteDataPath = path.join(rootDir, "data", "favourite.json");

// const {getDB}=require('../utils/databaseUtil');


// module.exports = class Favourite {
//   constructor(homeId){
//     this.homeId=homeId;
//   }
  
//   save() {
//     const db = getDB();
//     return db.collection('favourites').findOne({homeId: this.homeId}).then(existingFav => {
//       if (!existingFav) {
//         return db.collection('favourites').insertOne(this);
//       }
//       return Promise.resolve();
//     })
//   }

//   static getFavourites(){
//     const db = getDB();
//     return db.collection("favourites").find().toArray();
//   }
//   static deleteById(delhomeId) {
//     const db=getDB();
//     return db.collection('favourites').deleteOne({homeId:delhomeId});
    
//   }
  
// }
  
const mongoose=require('mongoose');
const favouriteSchema=mongoose.Schema({
  homeId:{
    type:mongoose.Schema.Types.ObjectId,          //relation with other collection     //id pointing to  home collection
    ref:'Home',
    required:true,
    unique:true,
  }
});
module.exports=mongoose.model('Favourite',favouriteSchema);

