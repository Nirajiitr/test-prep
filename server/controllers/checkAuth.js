export const checkAuth = (req, res) => {
  try {
    const userData = req.user;

    if (!userData) {
      return res
        .status(401)
        .json({ success: false, message: "unauthenticated" });
    }
    res.status(200).json({ success: true, userData, message: "authenticated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
