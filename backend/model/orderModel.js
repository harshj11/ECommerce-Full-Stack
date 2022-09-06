const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Please enter full address!"]
        },
        "village/town/city": {
            type: String,
            required: [true, "Please enter village/town/city!"]
        },
        district: {
            type: String,
            required: [true, "Please enter district!"]
        },
        state: {
            type: String,
            required: [true, "Please enter state!"]
        },
        country: {
            type: String,
            default: "India"
        },
        pincode: {
            type: Number,
            required: [true, "Please enter pincode!"]
        },
        contactNo: {
            type: Number,
            required: [true, "Please enter contact no!"]
        }
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please enter user id!"]
    },
    paymentInfo: {
        id: {
            type: String, 
            required: true
        },
        status: {
            type: String,
            required: true
        }
    }, 
    paidAt: {
        type: Date, 
        required: true
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0
    },
    shippingPrice: {
        type: Number, 
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        default: "Processing"
    },
    deliveredOn: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Order", orderSchema);