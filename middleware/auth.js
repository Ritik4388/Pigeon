const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // console.log("hey from verifyToken middleware");
    const token = req.headers["x-access-token"];

    if (!token) {
      throw new Error("No token provided");
    }
    // console.log(jwt.verify(token, process.env.TOKEN_KEY))
    const { userId, isAdmin } = jwt.verify(token, process.env.TOKEN_KEY);
    // console.log("hey", userId, isAdmin);
    req.body = {
      ...req.body,
      userId,
      isAdmin,
    };
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    return next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const optionallyVerifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return next();

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.body.userId = decoded.userId;

    next();
  } catch (err) {
    return next();
  }
};

module.exports = { verifyToken, optionallyVerifyToken };
