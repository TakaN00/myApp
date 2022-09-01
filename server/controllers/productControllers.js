const Product = require('../models/productModel')
const cloudinary = require('../utils/cloudinary')

// @desc add a new product
// @params POST /api/v1/products/addProduct
// @access PRIVATE admin

// exports.addProduct = async (req,res) =>{
//     try {
//         const {title, desc, img, category, subcategory, size, price, onStock} = req.body
//         const imagePath = `http://localhost:5000/my-uploads/${req.file.filename}`
//         const newProduct = await Product.create({
//             title, desc, img:imagePath, category, subcategory, size, price, onStock})
//         res.json(newProduct)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({msg:'something went wrong'})
//     }
// }

exports.addProduct = async (req,res) =>{
    try {
        const image = await cloudinary.uploader.upload(req.file.path)
        const {title, desc, img, category, subcategory, size, price, onStock} = req.body
        const newProduct = await Product.create({
            title, desc, img:image.secure_url, category, subcategory, size, price, onStock})
        res.json(newProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}


// @desc get product list
// @params GET /api/v1/products/
// @access PUBLIC
exports.getProducts = async (req,res) =>{
    try {
        const productList = await Product.find()
        res.json(productList)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc delete product by ID
// @params DELETE /api/v1/products/:id
// @access PRIVATE admin
exports.deleteProduct = async (req,res) =>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc update product by ID
// @params PUT /api/v1/products/:id
// @access PRIVATE admin
exports.updateProduct = async (req,res) =>{
    try {
        await Product.findByIdAndUpdate(req.params.id,{...req.body})
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc update product image by ID
// @params PUT /api/v1/products/image/:id
// @access PRIVATE admin

// exports.updateProductImage = async (req,res) =>{
//     try {
//         const imagePath = `http://localhost:5000/my-uploads/${req.file.filename}`
//         await Product.findByIdAndUpdate(req.params.id,{img:imagePath})
//         res.json({success:true})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({msg:'something went wrong'})
//     }
// }

exports.updateProductImage = async (req,res) =>{
    try {
        const image = await cloudinary.uploader.upload(req.file.path)
        await Product.findByIdAndUpdate(req.params.id,{img:image.secure_url})
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}