async function userLogout(req, res) {
  try {
    res.clearCookie("token");

    res.json({
      message: "User Logged Out Successfully!.",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogout;
