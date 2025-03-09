
const jwt = require('jsonwebtoken');


 const verifyJWT = (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.Id;

    next();
    
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = verifyJWT;
