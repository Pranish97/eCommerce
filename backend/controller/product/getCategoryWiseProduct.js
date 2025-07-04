const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || res.query;
    const product = await productModel.find({ category });

    res.json({
      data: product,
      message: "Product By Category",
      succes: true,
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

module.exports = getCategoryWiseProduct;
