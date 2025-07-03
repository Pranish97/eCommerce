const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const authToken = require("../middleware/authToken");
const updateUser = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct");
const getProductsController = require("../controller/product/getProducts");
const updateProductContoller = require("../controller/product/updateProduct");
const getSingleCategoryProduct = require("../controller/product/getSingleCategoryProduct");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCart");
const countCartProduct = require("../controller/user/countCartProduct");
const getCartProduct = require("../controller/user/getCartproduct");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-products", getProductsController);
router.post("/update-product", authToken, updateProductContoller);
router.get("/get-categoryProduct", getSingleCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);

router.post("/addToCart", authToken, addToCartController);
router.get("/countCartProduct", authToken, countCartProduct);
router.get("/cart-product", authToken, getCartProduct);

module.exports = router;
