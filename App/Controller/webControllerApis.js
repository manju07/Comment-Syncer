var DiffMatchPatch = require('diff-match-patch');
var dmp = new DiffMatchPatch();

var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/commentSyncer';

mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Modules
let comment = require("./../Modeles/commentModule");

let synComment="";
let fetchComment="";

let webPagesCtrl = function () {

    /**
     * update comment in DB
     */
    this.sync = function (req, res) {

        synComment=req.body.comment;
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        let patchResult=dmp.patch_apply(dmp.patch_make(fetchComment, synComment), fetchComment);
        fetchComment=synComment;
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
        comment.find({ name: "manju" }, function (err, result) {
            if (err) {
                
                res.send({ status: fail, result: "fail" });
                res.end();
            }
            else {
                fetchComment=result[0].comment;
                res.send({ status: true, "comment": result[0].comment });
                res.end();
            }
        });

    }
}

module.exports = new webPagesCtrl();
