const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const productExists = await addToCartModel.findOne({ productId });

    if (productExists) {
      return res.json({
        message: "Already Exists in cart!.",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const addToCart = new addToCartModel(payload);

    const saveProduct = await addToCart.save();

    res.json({
      data: saveProduct,
      message: "Product Added to Cart Successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
