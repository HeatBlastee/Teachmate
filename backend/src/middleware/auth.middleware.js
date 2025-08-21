

export async function protectRoute(req, res){
    try {
        const token = req.cookie.jwt;
        if (!token) {
            res
              .status(401)
              .json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
          return res
            .status(401)
            .json({ message: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
          return res
            .status(401)
            .json({ message: "Unauthorized - User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
    
}