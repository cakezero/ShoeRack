const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    brand_name: {
        type: String,
        required: true
    },
}, {timestamps: true});

const shoeSchema = new Schema({
    shoe_name: {
    type: String,
    required: true
    }
}, {timestamps: true});

const Brands = mongoose.model('Brands', brandSchema);

const Shoes = mongoose.model('Shoes', shoeSchema);

module.exports = {
    Brands,
    Shoes
}
