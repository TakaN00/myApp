const Category = require('../models/categoryModel')
const cloudinary = require('../utils/cloudinary')


// @desc add a new Category
// @params POST /api/v1/categories/addCategory
// @access PRIVATE admin

exports.addCategory = async (req,res) =>{
    try {
        const image = await cloudinary.uploader.upload(req.file.path)
        const {title, img} = req.body
        const newCategory = await Category.create({
            title, img:image.secure_url})
        res.json(newCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}


// @desc get Category list
// @params GET /api/v1/categories/
// @access PUBLIC
exports.getCategories = async (req,res) =>{
    try {
        const categoryList = await Category.find()
        res.json(categoryList)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}


// @desc delete Category by ID
// @params DELETE /api/v1/categories/:id
// @access PRIVATE admin
exports.deleteCategory = async (req,res) =>{
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}


// @desc update Category by ID
// @params PUT /api/v1/categories/:id
// @access PRIVATE admin

exports.updateCategory = async (req,res) =>{
    try {
        await Category.findByIdAndUpdate(req.params.id,{...req.body})
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}


// @desc update Category image by ID
// @params PUT /api/v1/categories/image/:id
// @access PRIVATE admin

exports.updateCategoryImage = async (req,res) =>{
    try {
        const image = await cloudinary.uploader.upload(req.file.path)
        await Category.findByIdAndUpdate(req.params.id,{img:image.secure_url})
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}