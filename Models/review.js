const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    message:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        max:10,
        min:1
    },

    employee:{
        type: Schema.Types.ObjectId,
        ref:"employee"
    }
    
},{
    timestamps:true
});

const reviewModel = mongoose.model('review', reviewSchema);
module.exports = reviewModel;