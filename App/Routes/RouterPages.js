const express=require("express");
const app=express.Router();

const webPagesCtrl=require("./../Controller/webPagesRender");
const webApiCtrl=require("./../Controller/webControllerApis");


// load home page
app.get('/',webPagesCtrl.homePage);

// Sync comment 
app.post("/comment/sync",webApiCtrl.sync);

// load updated comment
app.get("/comment/fetch",webApiCtrl.fetch);


module.exports=app;