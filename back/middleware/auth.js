// Appel de la dépendance
const jwt = require('jsonwebtoken');
 
// Vérification de l'authentification utilisateur
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       }; 
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};