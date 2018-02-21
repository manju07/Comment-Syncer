const express=require("express");
const bodyParser= require('body-parser');
var morgan= require('morgan');
const app=express();

app.set('views', __dirname + '/Views');
// app.set('Public', __dirname + '/Public');
app.use(express.static(__dirname+"/Public"));
app.use(express.static(__dirname + '/Views'));

app.engine('html', require('ejs').renderFile);

app.use(morgan('dev'));
app.use(bodyParser.json());


// render home page
app.use("/",require("./App/Routes/RouterPages"));

var port=process.env.PORT || 8000;

app.listen(port,function()
{
    console.log("listing on port 8000");

})
