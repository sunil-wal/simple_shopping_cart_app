const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    title: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    inventory: {type: Number, required: true},
},
{
  collection: "products"
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);