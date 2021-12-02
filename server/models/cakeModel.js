const mongoose = require( 'mongoose' );
const {commentSchema, commentModel} = require('./commentModel');


const cakeSchema = new mongoose.Schema({
    baker : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    imageUrl : {
        type : String,
        required : true,
    },
    comments : [commentSchema],
    createdAt : {
        type : Date,
        default : Date.now
    },
    UpdatedAt : {
        type : String,
        type : Date,
        default : Date.now
    },
});

const cake = mongoose.model( 'cake', cakeSchema );

const cakeModel = {
    create : function( newCake ){
        return cake.create( newCake );
    },
    getAll : function(){
        return cake.find();
    },
    getOneById : function( id ){
        return cake.findOne({_id: id}); 
    },
    deleteOne : function( id ){
        return cake.deleteOne({_id: id});
    },
    updateOne : function( cakeId, taskToUpdate ){
        return cake.findOneAndUpdate( {_id : cakeId}, {$set : taskToUpdate }, {new : true} )
    },
    AddCommentToCake : function(cakeId, newComment) {
        return commentModel.createComment(newComment)
        .then( result => {
            return cake.findByIdAndUpdate({_id: cakeId}, {$push: {comments: result}});
        });
    }
};

module.exports = {cakeModel, cakeSchema};
