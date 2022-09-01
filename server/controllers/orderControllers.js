const Order = require('../models/orderModel')
const Cart = require('../models/cartModel');


// @desc create a new order
// @params POST /api/v1/orders/
// @access PRIVATE

exports.newOrder = async (req,res) =>{
    try {
        const cart = await Cart.findOne({owner:req.userId})
        const {gouvernorat, address, phone, amount, cartList} = req.body
        const newOrder = await Order.create({serial:Date.now() ,owner: req.userId, products: cartList, gouvernorat, address, phone, amount})
        res.json(newOrder)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}


// @desc get orders
// @params GET /api/v1/orders/orderlist
// @access PRIVATE

exports.getOrders = async (req,res) =>{
    try {
        const orderList = await Order.find({owner:req.userId})
        res.json(orderList)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc get order by id
// @params GET /api/v1/orders/orderdetails/:id
// @access PRIVATE
exports.getOrderDetails = async (req,res) =>{
    try {
        const orderDetails = await Order.find(req.params.id)
        res.json(orderDetails)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc get all orders
// @params GET /api/v1/orders/allorders
// @access PRIVATE admin

exports.getAllOrders = async (req,res) =>{
    try {
        const allOrders = await Order.find().populate('owner','username')
        res.json(allOrders)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}


// @desc delete order
// @params DELETE /api/v1/orders/:id
// @access PRIVATE admin

exports.deleteOrder = async (req,res) =>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}


// @desc update order
// @params PUT /api/v1/orders/:id
// @access PRIVATE admin

exports.updateOrder = async (req,res) =>{
    try {
        await Order.findByIdAndUpdate(req.params.id,{...req.body})
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

