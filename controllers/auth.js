const jwt = require('jsonwebtoken')

const SECRET = "vYIjOaok5N5K<bKnsVqtA3$%c^{?]i32~[;EQ64@L]vF=aquE>b2i967cqq?°HLn"

const checkToken = function(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
      let token = req.headers.authorization
      jwt.verify(token, SECRET, (err, user) => {
          if (err) {  
              res.status(500).json({ error: "Not Authorized" });
              throw new Error("Not Authorized");
          }
          req.user = user
          return next();
      });
  } else { 
      res.status(500).json({ error: "Not Authorized" });
      throw new Error("Not Authorized");
  }
}

module.exports = {
  SECRET,
  checkToken
}