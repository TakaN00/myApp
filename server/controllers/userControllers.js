const User = require('../models/userModel')
const Cart = require('../models/cartModel');
const Wishlist = require('../models/wishlistModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');


// @desc register a new user
// @params POST /api/v1/users/register
// @access PUBLIC
exports.register = async (req,res) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {username, email, password} = req.body
        const existUser = await User.findOne({email})
        if (existUser) return res.status(400).json({msg:'User already registered'})
        var salt = bcrypt.genSaltSync(12);
        var hash = bcrypt.hashSync(password, salt)
        const newUser = await User.create({username, email, password:hash, subdate: Date()})
        const token = jwt.sign({sub:newUser._id},process.env.JWT_SECRET)
        //create new cart for each new user
        await Cart.create({owner: newUser._id})
        //create new wishlist for each new user
        await Wishlist.create({owner: newUser._id})
        res.json({success: true, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc login as a user
// @params POST /api/v1/users/login
// @access PUBLIC
exports.login = async (req,res) =>{
    try {
        const { email, password} = req.body
        const existUser = await User.findOne({email})
        if (!existUser) return res.status(400).json({msg:'You should register first'})
        var validate = await bcrypt.compare(password, existUser.password)
        if (!validate) return res.status(400).json({msg:'Invalid password'})
        const token = jwt.sign({sub:existUser._id, role:existUser.role},process.env.JWT_SECRET)
        res.json({success: true, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc get user info
// @params GET /api/v1/users/
// @access PRIVATE
exports.getUserInfo= async (req,res)=>{
    try {
        const userInfo = await User.findById(req.userId).select('-password -__v')
        res.json(userInfo)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc get user list
// @params GET /api/v1/users/userlist
// @access PRIVATE admin
exports.getUserList= async (req,res)=>{
    try {
        const userList = await User.find().select('-password -__v')
        res.json(userList)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc delete User by ID
// @params DELETE /api/v1/users/:id
// @access PRIVATE admin
exports.deleteUser = async (req,res) =>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}