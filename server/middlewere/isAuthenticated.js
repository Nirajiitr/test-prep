import jwt from "jsonwebtoken";
export const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const Token = authHeader && authHeader.split(" ")[1];
    
    if (!Token) {
      return res.status(401).json({ message: "user not authenticated" });
    }

    jwt.verify(Token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            message: "Session is Expired! login again.",
          });
        } else if (err.name === "JsonWebTokenError") {
          return res
            .status(401)
            .json({ success: false, message: "Invalid Token!" });
        } else {
          return res
            .status(401)
            .json({ success: false, message: "verification faild!" });
        }
      }
      req.user = {
        _id: decode._id,
        fullname: decode.fullname,
        email: decode.email,
        userType: decode.userType,
        stream: decode.stream,
        class: decode.class,
      };

      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};
