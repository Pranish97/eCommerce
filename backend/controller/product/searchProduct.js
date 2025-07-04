const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    const query = req?.query.q;

    const regex = new RegExp(query, "i", "g");

    const product = await productModel.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });

    res.json({
      message: "Search Product List",
      data: product,
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

module.exports = searchProduct;
