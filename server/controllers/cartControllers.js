const Cart = require('../models/cartModel');

// @desc add items to cart
// @params PUT /api/v1/cart/addtocart
// @access PRIVATE

exports.addCart = async (req,res) =>{
    try {
        const cart = await Cart.findOne({owner:req.userId})
        const product = req.body.productId
        const item = await cart.products.find(c => c.productId == product)
        if (item) {
            const userCart = await Cart.findOneAndUpdate({owner:req.userId, "products.productId":product},{
                "$set" : {
                    "products.$": {
                        ...req.body,
                        quantity : item.quantity + req.body.quantity
                    }
                }
            })
        }else{
            const userCart = await Cart.findOneAndUpdate({owner:req.userId},{
                "$push" : {
                    "products": req.body
                }
            })
        }

        res.json({success:true})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc get cart
// @params GET /api/v1/cart/
// @access PRIVATE

exports.getCart = async (req,res) =>{
    try {
        const cartList = await Cart.find({owner:req.userId}).populate('products.productId')
        res.json(cartList)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}


// @desc remove items from cart
// @params PUT /api/v1/cart/removefromcart
// @access PRIVATE

exports.removeCart = async (req,res) =>{
    try {
        const userCart = await Cart.findOne({owner:req.userId})
        await userCart.updateOne({
                "$pull" : {
                        products : req.body
                }
            })

        res.json({success:true})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}


// @desc delete cart
// @params PUT /api/v1/cart/deletecart
// @access PRIVATE

exports.deleteCart = async (req,res) =>{
    try {
        const userCart = await Cart.findOne({owner:req.userId})
        await userCart.updateOne({
                "$unset" : {
                        products : ""
                }
            })

        res.json({success:true})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}
