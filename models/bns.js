const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    brandName: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Brands = mongoose.model('Brands', brandSchema);

const shoeSchema = new Schema({
    shoeName: {
    type: String,
    required: true
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brands'
    }
}, { timestamps: true });

brandSchema.pre('remove', function (next) {
    Shoes.remove({brand: this._id}).exec();
    next();
});

const Shoes = mongoose.model('Shoes', shoeSchema);

module.exports = {
    Brands,
    Shoes
}
