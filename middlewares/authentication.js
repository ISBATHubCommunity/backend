const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  )
    token = req.headers.authorization.split("Bearer ")[1];
  else
    return res.status(401).json({
      error: "Unauthorized Access"
    });

  token = req.headers.authorization.split("Bearer ")[1];

  //varify the token
  const verifiedToken = await jwt.verify(token, "THISISAFAKESCRETEKEY");
  if (!verifiedToken) {
    return res.status(403).json({
      error: "Sorry you are unauthorized to access this resources!"
    });
  }

  req.headers.userId = verifiedToken.userId;
  req.headers.email = verifiedToken.email;
  req.headers.username = verifiedToken.username;

  next();
};
