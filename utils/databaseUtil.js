// const mysql=require('mysql2');

// const pool =mysql.createPool({    // to establish a connectionpool ,but a shared pool
//   host: "localhost",
//   user:"root",
//   password:"root",
//   database:"airbnb",
// })
// module.exports=pool.promise();

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://root:root@ayushirani.fahzki9.mongodb.net/?retryWrites=true&w=majority&appName=AyushiRani";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      
      callback( );
      _db=client.db('airbnb');
    })
    .catch((err) => {
      console.log("Error while connecting to Mongo:", err);
    });
};

const getDB= () => {
  if(!_db){
    throw new error('Mongo not connected');
  }
  return _db;
}
exports.mongoConnect=mongoConnect;
exports.getDB=getDB;
