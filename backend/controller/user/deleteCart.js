const addToCartModel = require("../../models/cartProduct");

const deleteCart = async (req, res) => {
  try {
    const currentUser = req.userId;
    const productId = req?.body._id;

    const deleteProduct = await addToCartModel.deleteOne({ _id: productId });

    res.json({
      message: "Product Remove from Cart!",
      success: true,
      error: false,
      data: deleteProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteCart;
