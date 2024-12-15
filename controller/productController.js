const Product = require('../models/productModel')

const createProduct = async(req,res) => {
    try {
        
        const { name, price, description,category, image, stock, gender,brand } = req.body

        const product = new Product({
            name,
            price,
            category,
            description,
            image,
            stock,
            gender,
            brand,
            createdAt: new Date
        })

        await product.save()

        return res.status(200).json({ product, message: 'Product created successfully' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error creating product'})
    }
}

const updateProduct = async(req,res) => {
    try {

        const { productId } = req.params
        const { name, price, description, category, gender, image, stock, brand } = req.body

        const updateProduct = await Product.findByIdAndUpdate(productId, { name, price, description, category, image, stock, gender, brand })

        if(!updateProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }

        return res.status(200).json({ product: updateProduct, message: 'Product updated successfully' })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error updating product'})
    }
}

const getProducts = async(req,res) => {
    try {
        
        const { name, brand, category,  minPrice, maxPrice, sortBy, sortOrder, gender } = req.query

        const filter = {}

        if (brand) {
            filter.brand = { $regex: brand, $options: "i" };
        }
        if (category) {
            filter.category = { $regex: category, $options: "i" }; 
        }
        if (name) {
            filter.name = { $regex: name, $options: "i" }; 
        }
        
        if(gender){
            filter.gender = gender
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                const cleanMinPrice = parseFloat(minPrice.replace(/,/g, ""));
                filter.price.$gte = cleanMinPrice; 
            }
            if (maxPrice) {
                const cleanMaxPrice = parseFloat(maxPrice.replace(/,/g, "")); 
                filter.price.$lte = cleanMaxPrice; 
            }
        }

        let sortOptions = {}
        if(sortBy){
            sortOptions[sortBy] = sortOrder === 'asc'? 1 : -1
        }

        const totalCounts = await Product.countDocuments(filter)
        const products = await Product.find(filter).sort(sortOptions)

        return res.status(200).json({totalCounts,products})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error retrieving product'})
    }
}

const deleteProduct = async(req,res) => {
    try {

        const { productId } = req.params

        if(!productId) {
            return res.status(400).json({ message: 'Invalid product ID' })
        }

        const deleteProduct = await Product.findByIdAndDelete(productId)

        if(!deleteProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }

        return res.status(200).json({ message: 'Product deleted successfully' })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error deleting product'})
    }
}

module.exports = { createProduct ,getProducts ,updateProduct, deleteProduct }