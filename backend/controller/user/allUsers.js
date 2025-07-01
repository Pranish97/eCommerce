const userModel = require("../../models/userModel");

async function allUsers(req, res) {
  try {
    console.log("userId all users", req.userId);

    const allUser = await userModel.find();

    res.json({
      message: "All User",
      data: allUser,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      succes: false,
    });
  }
}

module.exports = allUsers;
