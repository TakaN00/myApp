const Wishlist = require('../models/wishlistModel');

// @desc add items to wishlist
// @params PUT /api/v1/wishlist/addtowishlist
// @access PRIVATE

exports.addWishlist = async (req,res) =>{
    try {
        const wishlist = await Wishlist.findOne({owner:req.userId})
        const product = req.body.productId
        const item = await wishlist.products.find(c => c.productId == product)
        if (item) {
            const userWishlist = await Wishlist.findOneAndUpdate({owner:req.userId, "products.productId":product},{
                "$set" : {
                    "products.$": {
                        ...req.body,
                        quantity : item.quantity + req.body.quantity
                    }
                }
            })
        }else{
            const userWishlist = await Wishlist.findOneAndUpdate({owner:req.userId},{
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

// @desc get wishlist
// @params GET /api/v1/wishlist/
// @access PRIVATE

exports.getWishlist = async (req,res) =>{
    try {
        const wishlist = await Wishlist.find({owner:req.userId}).populate('products.productId')
        res.json(wishlist)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}


// @desc remove items from wishlist
// @params PUT /api/v1/wishlist/removefromwishlist
// @access PRIVATE

exports.removeWishlist = async (req,res) =>{
    try {
        const userWishlist = await Wishlist.findOne({owner:req.userId})
        await userWishlist.updateOne({
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


// @desc delete wishlist
// @params PUT /api/v1/wishlist/deletewishlist
// @access PRIVATE

exports.deleteWishlist = async (req,res) =>{
    try {
        const userWishlist = await Wishlist.findOne({owner:req.userId})
        await userWishlist.updateOne({
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
