const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function uploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission Denied");
    }
    const uploadProdut = new productModel(req.body);
    const saveProduct = await uploadProdut.save();

    res.status(200).json({
      message: "Product Created Successfully!.",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

module.exports = uploadProductController;
