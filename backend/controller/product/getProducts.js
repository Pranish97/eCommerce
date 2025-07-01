const productModel = require("../../models/productModel");

const getProductsController = async (req, res) => {
  try {
    const allProduct = await productModel.find().sort({ createdAt: -1 });

    res.json({
      message: "All Products",
      success: true,
      erro: false,
      data: allProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: message.error || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductsController;
