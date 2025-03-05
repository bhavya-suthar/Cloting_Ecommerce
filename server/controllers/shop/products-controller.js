const Product = require('../../models/Products')

const getFilteredProducts = async(req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        console.log("🚀 ~ getFilteredProducts ~ error:", error)
        res.status(500).json({
            success: false,
            message: "Some Error occured in fetch time"
        })
    }
}

module.exports = {getFilteredProducts}