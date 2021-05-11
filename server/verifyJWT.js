const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }

  module.exports = verifyJWT