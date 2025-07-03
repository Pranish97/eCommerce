const addToCartModel = require("../../models/cartProduct");

const getCartProduct = async (req, res) => {
  try {
    const { currentUser } = req?.userId;
    const cartProduct = await addToCartModel.find({
      userId: currentUser,
    });

    res.json({
      data: cartProduct,
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

module.exports = getCartProduct;
