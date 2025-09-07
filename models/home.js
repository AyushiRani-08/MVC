const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const filepath = path.join(rootDir, "data", "home.json");


module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }
  save() {
    Home.fetchAll((registeredHomes) => {
      if(this.id){
        registeredHomes=registeredHomes.map(home =>  home.id === this.id ? this :home);
      }else{
        this.id=Math.random().toString();
        registeredHomes.push(this);
      }

      fs.writeFile(filepath, JSON.stringify(registeredHomes), (err) => {
        if (err) console.error("Error writing file:", err);
        else console.log("File updated successfully");
      });
    });
    
    
  }
  static fetchAll(callback) {
    // async operation hence gives errors
    const filepath = path.join(rootDir, "data", "home.json");
    fs.readFile(filepath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
  static findById(homeId,callback){
    this.fetchAll(homes => {
      const homeFound=homes.find((home) => home.id ===homeId);
      callback(homeFound);
    })
  }
};
