
let webCtrl=function()
{
    // render home page
    this.homePage=function(req,res)
    {
        res.render("home.html");
    }
}

module.exports=new webCtrl();
