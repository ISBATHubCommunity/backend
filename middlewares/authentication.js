const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split("Bearer ")[1];
    } else {
      return res.status(401).json({
        error: "Unauthorized Access"
      });
    }

    token = req.headers.authorization.split("Bearer ")[1];

    //varify the token
    const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY);
    if (!verifiedToken) {
      return res.status(403).json({
        error: "Sorry you are unauthorized to access this resources!"
      });
    } else {
      req.headers = {
        userId: verifiedToken.userId,
        email: verifiedToken.email,
        username: verifiedToken.username
      };

      //pass it on to the next middleware in the chain or stack.
      next();
    }

    // req.headers.userId = verifiedToken.userId;
    // req.headers.email = verifiedToken.email;
    // req.headers.username = verifiedToken.username;
  } catch (error) {
    res.status(500).json({
      authenticationError: "Your authentication fail please try again!"
    });
  }
};
