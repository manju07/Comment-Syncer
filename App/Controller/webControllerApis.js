var DiffMatchPatch = require('diff-match-patch');
var dmp = new DiffMatchPatch();

var mongoose = require('mongoose');

//Set up default mongoose connection
// var mongoDB = 'mongodb://127.0.0.1/commentSyncer';

var mongoDB ="mongodb://m:m@ds249418.mlab.com:49418/profile-data";

mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Modeles
let comment = require("./../Modeles/commentModule");

let synComment="";
let fetchComment="";

let flag=0;

let webCtrl = function () {

    /**
     * update comment in DB
     */
    this.sync = function (req, res) {


        let options = { upsert: true, new: true, setDefaultsOnInsert: true };

        let patchResult=dmp.patch_apply(dmp.patch_make(req.body.comment),fetchComment);
        console.log("patch_make:"+dmp.patch_make(req.body.comment))
        console.log("patchResult result:" + patchResult[0]);
        synComment=patchResult[0];    
        fetchComment=patchResult[0];
        comment.findOneAndUpdate({ name: "manju" }, { comment: patchResult[0]}, options, function (err, result) {
            if (err) {
                res.send({ status: fail, message: "fail" });
                res.end();
            }
            else {
                res.send({ status: true, message: "success" });
                res.end();
            }

        })
    };
     /**
     * fetch comment from DB.
     */
    this.fetch = function (req, res) {


        comment.findOne({ name: "manju" }, function (err, result) {
            if (err) {
                console.log("err:"+err);
                res.send({ status: fail, result: "fail" });
                res.end();
            }
            else {
                console.log("result:"+result);       


                if(result==null)
                {
                    let document=new comment({ name: "manju",comment:"" });

                    document.save((function (err) {
                        if (err){
                            console.log("error while creating document:"+err);
                        }
                        else
                        {
                            console.log("Created document");
                            res.send({ status: true, "comment": ""});
                            res.end();
                        }
                        // saved!
                    })
                    );
      
                }
                else {   
                    fetchComment=result["comment"];
                    res.send({ status: true, "comment": result.comment });
                    res.end();
                }

            }
        });

    }
}

module.exports = new webCtrl();
