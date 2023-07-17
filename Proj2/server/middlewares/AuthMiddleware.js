const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  //next: next function 불려짐.
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "user not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
