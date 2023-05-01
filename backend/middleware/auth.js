const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
  
    let token = req.headers.authorization;
  
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    token = token.split(' ')[1];
    console.log(token);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log("vari" , verified);

    // {
    //   user: '644ea779ef664a18bfeb7a1d',
    //   userEmail: 'foisal1@gmail.com',
    //   iat: 1682889931
    // }

    req.user = verified.user;

    console.log(req.user);

    next();

  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = auth;