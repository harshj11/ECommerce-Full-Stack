const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name Required!"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product Description Required!"]
    }, 
    price: {
        type: Number,
        required: [true, "Product Price Required!"],
        maxLength: [8, "Price cannot exceed 8 characters!"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            }, 
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Product Category Required!"]
    },
    stock: {
        type: Number,
        required: [true, "Product Stock Required!"],
        maxLength: [4, "Stock cannot exceed 4 characters!"],
        default: 1
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User", 
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User", 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);