const User = require("../models/User");
const { verify } = require("../helpers/token");

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({ error: "Not authenticated" });
    }

    const tokenData = verify(token);
    const user = await User.findById(tokenData.id);

    if (!user) {
      return res.status(401).send({ error: "Authenticated user not found" });
    }

    req.user = user;
    next();
  } catch (e) {
    res.clearCookie("token");
    return res.status(401).send({ error: "Invalid token" });
  }
};
