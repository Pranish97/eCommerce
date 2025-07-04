const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
  const currentUser = req.userId;
  const addToCartProductId = req.body._id;
  const qty = req.body.quantity;

  const updateProduct = await addToCartModel.updateOne(
    { _id: addToCartProductId },
    { $set: { quantity: qty } }
  );

  res.json({
    message: "Product Quantity Updated!!",
    data: updateProduct,
    error: false,
    success: true,
  });

  try {
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateAddToCartProduct;
