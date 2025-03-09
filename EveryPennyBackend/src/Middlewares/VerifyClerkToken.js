
const Clerk = require('@clerk/clerk-sdk-node')

const verifyClerkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const clerkUser = await Clerk.clients.verifyToken(token);
    req.clerkUser = clerkUser;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
module.exports = {verifyClerkToken}