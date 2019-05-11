var mongoose = require('mongoose');

//Product Shema
var productShema = mongoose.Schema({
//  _id:{
//       type: Number,
  //     required: false
   //},
    name:{
        type: String,
        required: true
    },
    producer:{
        type: String,
        required: true
    },
    volume: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    made_in: {
        type: String,
        required: true
    }

});

var Product = module.exports = mongoose.model('Product', productShema);
