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
    this.sync = function (req, res) {
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        synComment=req.body.comment;
        let result=dmp.diff_main(fetchComment, synComment) ;
        dmp.diff_cleanupSemantic(result);
        console.log("diff_main result:"+result);
        comment.findOneAndUpdate({ name: "manju" }, { comment: req.body.comment }, options, function (err, result) {
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
