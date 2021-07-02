const jwt = require('jsonwebtoken');

const accessTokenSecret = 'secret';


const auth = (req, res, next) => {
  const token = req.headers;
  console.log(token);

  // Check for token
  if (!token)
    // console.log(req.headers)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, accessTokenSecret);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

module.exports =auth;