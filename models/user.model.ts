import mongoose from 'mongoose';

const Product = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    countInStock: { type: String, required: true },
    rating: { type: String, required: true },
    numReviews: { type: String, required: true },

})

export default mongoose.model('Product', Product);