const jwt = require('jsonwebtoken');

const response = {
  status: false,
  message: "",
  data: null
} 

function verifyJWT(req, res, next = null){
    const token = req.headers['authorization'];             
    if (!token) return res.status(401).json({...response, message: "Nenhum token recebido."});
    
    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
      if (err) return res.status(401).json({...response, message: "Falha ao verificar token."});
      if(!!next) { //se for middleware
        res.locals.decoded = decoded
        next();
        return 
      } 
      return res.status(200).json({
        status: true, 
        message: "Token válido.",
        data: decoded
      }); // se for route
    });
  }

  module.exports = verifyJWT