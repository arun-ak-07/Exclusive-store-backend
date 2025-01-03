const Cart = require('../models/cartModel');

const addItem = async (req, res) => {
    try {
        const userId = req.user._id
        const { productId, name, price, image, quantity } = req.body;

        if (!userId || !productId || !name || !price || !image || !quantity) {
            return res.status(400).json({ message: 'Incomplete data provided' });
        }

        const cart = await Cart.findOne({ userId:userId });

        if (cart) {

            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex >= 0) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, name, price, image, quantity });
            }

            await cart.save();
        } else {
            const newCart = await Cart.create({
                userId,
                items: [{ productId, name, price, image, quantity }]
            });
            await newCart.save();
        }

        return res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getCart = async(req,res) => {
    try {

        const userId = req.user._id

        if(!userId){
            return res.status(400).json({ message: 'No user provided' });
        }

        const cartExist = await Cart.findOne({ userId})

        if(!cartExist){
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json(cartExist);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const removeItem = async(req,res) => {
    try {

        const { productId } = req.body;
        const userId = req.user._id

        if(!userId || !productId){
            return res.status(400).json({ message: 'Incomplete data provided' }); 
        }

        const cartExist = await Cart.findOne({ userId });

        if(!cartExist){
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        const itemIndex = cartExist.items.findIndex(item => item.productId.toString() === productId);

        if(itemIndex >= 0){
            cartExist.items.splice(itemIndex, 1);
            await cartExist.save();
        } else {
            return res.status(404).json({ message: 'Item not found in the cart' });  
        }

        return res.status(200).json({ message: 'Item removed from cart successfully' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = { addItem, getCart, removeItem };
