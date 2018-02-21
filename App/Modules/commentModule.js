var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var add_comment = mongoose.Schema(
    {
        name:{
            type:String
        },
        comment:
        {
            type:String 
        }
    });
    
    var add_comment_schema = mongoose.model('addComments', add_comment);
    
    module.exports = add_comment_schema;
    
    