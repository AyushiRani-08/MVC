// Core Module
// const path = require('path');  //not nedded when used EJS   

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
// const rootDir = require("../utils/pathUtil");
const homesController=require('../controllers/home');

hostRouter.get("/add-home", homesController.getAddHome)
hostRouter.post("/add-home",homesController.postAddHome )
hostRouter.get("/host-home-list",homesController.getHostHomes)
hostRouter.get("/edit-home/:homeId",homesController.getEditHome);
hostRouter.post("/edit-home",homesController.postEditHome);
hostRouter.post("/delete-home/:homeId",homesController.postDeleteHome);


module.exports = hostRouter;
