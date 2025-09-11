// Core Modules
// const path = require('path');

// External Module
const express = require('express');
const storeRouter = express.Router();

// Local Module
// const { registeredHomes } = require('./hostRouter');
const storeController=require('../controllers/store');

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/home", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);

storeRouter.get("/favourite", storeController.getFavourite);
storeRouter.post("/favourite", storeController.postAddToFavourite);

storeRouter.get("/homes/:homeId",storeController.getHomeDetails);
storeRouter.post("/favourite/delete/:homeId",storeController.postRemoveFromFavourite);

module.exports = storeRouter;
