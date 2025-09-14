// const fs = require("fs");
// const path = require("path");
// const rootDir = require("../utils/pathUtil");
// const Favourite = require("./favourite");
// const filepath = path.join(rootDir, "data", "home.json");   // all for files

// const db = require("../utils/databaseUtil"); //for sql

// const { getDB } = require("../utils/databaseUtil");
// const { ObjectId } = require("mongodb");

// module.exports = class Home {
//   constructor(houseName, price, location, rating, photo, description, _id) {
//     this.houseName = houseName;
//     this.price = price;
//     this.location = location;
//     this.rating = rating;
//     this.photo = photo;
//     this.description = description;
//     if (_id) {
//       this._id = _id;
//     }
//   }
//   save() {
//     // if (this.id) {
//     //   //update
//     //   return db.execute('UPDATE homes SET houseName=? , price=? , location=? , rating =? ,photo=? , description= ? WHERE id =?', [this.houseName,this.price,this.location,this.rating,this.photo,this.description,this.id]);
//     // } else {
//     //   return db.execute(
//     //     `INSERT INTO homes (houseName, price, location,rating,photo, description )
//     //  VALUES (?, ?, ?, ?, ?, ?)`,
//     //     [
//     //       this.houseName,
//     //       this.price,
//     //       this.location,
//     //       this.rating,
//     //       this.photo,
//     //       this.description,
//     //     ]
//     //   );
//     // }          //for sql
//     const db = getDB();
//     if(this._id){ //update
//       const updateFields={
//         houseName:this.houseName,
//         price:this.price,
//         rating:this.rating,
//         photo:this.photo,
//         description:this.description
//       }
//       return db.collection("homes").updateOne({ _id: new ObjectId(String(this._id)) },{$set:updateFields});

//     }else{ //insert
//       return db.collection("homes").insertOne(this);
//     }
    
//   }

//   static find() {
//     // return db.execute("SELECT * FROM homes");

//     const db = getDB();
//     return db.collection("homes").find().toArray();
//   }
//   static findById(homeId) {
//     // return db.execute("SELECT * FROM homes WHERE id=?", [homeId]);
//     const db = getDB();
//     return db
//       .collection("homes")
//       .find({ _id: new ObjectId(String(homeId)) })
//       .next();
//   }
//   static deleteById(homeId) {
//     // return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
//     const db = getDB();
//     return db
//       .collection("homes")
//       .deleteOne({ _id: new ObjectId(String(homeId)) });
//   }
// };
const mongoose=require('mongoose');
const favourite=require('./favourite')

const homeSchema=mongoose.Schema({   //aparts from all these anything else can also be saved
  houseName:{type:String ,required:true},
  price:{type:Number,required:true},
  location:{type:String,required:true},
  rating:{type:Number,required:true},
  photo:String,
  description:String,
});
homeSchema.pre('findOneAndDelete',async function (next){
  console.log('Came to pre hook while deleting');
  const homeId=this.getQuery()._id;
  await favourite.deleteMany({homeId:homeId});
  next();
})
module.exports=mongoose.model('Home',homeSchema);  //Exporting type of Home class