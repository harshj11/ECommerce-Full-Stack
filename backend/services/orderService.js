const Order = require('../model/orderModel');
const Product = require('../model/productModel');
const ErrorHandler = require('../utils/errorHandler');

class OrderService {

    /**
     * Create a new order.
     * 
     * @param {req} req 
     * @param {res} res 
     * @param {function} next
     * 
     * @return a success response if new order created successfully.
     */
    static newOrder = async (req, res, next) => {
        const { 
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            user: req.user.id,
            paymentInfo,
            paidAt: Date.now(),
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        res.status(201).json({
            success: true,
            order
        });
    }

    /**
     * Get an order with given order id.
     * 
     * @param {HTTP} req 
     * @param {HTTP} res 
     * @param {function} next 
     * 
     * @return a success response if order with given id found.
     */
    static getSingleOrder = async (req, res, next) => {
        const order = await Order.findById(req.params.orderId).populate("user", "email name");

        if(!order)
            return next(new ErrorHandler(404, `Order not found with ${req.params.orderId}!`));
        
        res.status(200).json({
            success: true,
            order
        });
    }

    /**
     * Get all the orders for the current user.
     * 
     * @param {req} req 
     * @param {res} res 
     * @param {next} next 
     * 
     * @return all the orders for the current made by the current user.
     */
    static myOrders = async (req, res, next) => {
        const orders = await Order.find({ user: req.user.id });

        res.status(200).json({
            success: true,
            orders
        });
    }

    /**
     * Get all the orders.
     * 
     * @param {HTTP} req 
     * @param {HTTP} res 
     * @param {function} next 
     * 
     * @return a success response with all the orders and the total price of all the orders.
     */
    static getAllOrders = async (req, res, next) => {
        const orders = await Order.find();
        
        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += order.totalPrice;
        });

        res.status(200).json({
            success: true,
            totalAmount,
            orders
        });
    }

    /**
     * Update the order status.
     * 
     * @param {HTTP} req 
     * @param {HTTP} res 
     * @param {function} next 
     * 
     * @return a success response, if order status updated successfully.
     */
    static updateOrderStatus = async (req, res, next) => {
        const order = await Order.findById(req.params.id);
        
        if(!order)
            return next(new ErrorHandler(404, `Order not found with ${req.params.id}!`));

        // If the order has already been delivered.
        if(order.orderStatus === "Delivered")
            return next(new ErrorHandler(422, "The order has already been delivered!"));
        
        // For each item update its stock.
        const items = order.orderItems;
        let updateStockResult = null;
        for(let i = 0; i < items.length; i++) {
            updateStockResult = await this.updateProductStock(items[i].product, items[i].quantity);
            if(!updateStockResult.success) 
                return next(new ErrorHandler(updateStockResult.errorCode, updateStockResult.reason));
        }

        order.orderStatus = req.body.status;

        if(req.body.status === "Delivered")
            order.deliveredAt = Date.now();

        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true
        });
    }

    /**
     * Update the product stock.
     * 
     * @param {string} id 
     * @param {Number} quantity 
     * 
     * @return an object having success key only, if it's a successful execution, else this object would also 
     * have the errorCode and reason, if the product not found or inadequate quantity.
     */
    static updateProductStock = async (id, quantity) => {
        const product = await Product.findById(id);

        // If product not found
        if(!product)
            return {
                success: false,
                errorCode: 404,
                reason: `Product not found with ${id}!`
            }
        
        product.stock -= quantity;

        // Inadequate quantity
        if(product.stock < 0)
            return {
                success: false,
                errorCode: 422,
                reason: "Inadequate stock!"
            }

        await product.save({ validateBeforeSave: false });

        return { success: true }
    }
    
    /**
     * Deletes the order with given order id.
     * 
     * @param {HTTP} req 
     * @param {HTTP} res 
     * @param {function} next 
     * 
     * @return success response, if order deleted successfully.
     */
    static deleteOrder = async (req, res, next) => {
        const order = await Order.findById(req.params.id);

        if(!order)
            return next(new ErrorHandler(404, `Order not found with ${req.params.id}!`));
        
        await order.remove();
        
        res.status(200).json({
            success: true
        });
    }
}

module.exports = OrderService;