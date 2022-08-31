// Appel d'un routeur
const express = require('express');
const router = express.Router();

// Appel du middleware de limite d'essai de connexion
const rateLimit = require('../middleware/rateLimit')

// Appel du middleware de validation du mot de passe
const password = require('../middleware/password')

// Appel du middleware de validation de l'email
const email = require('../middleware/email')

// Appel du contrôleur utilisateur
const userCtrl = require('../controllers/user');

// Déclaration des routes utilisateur
router.post('/signup', password.passwordValidation, email.emailValidation, userCtrl.signup);
router.post('/login', rateLimit, userCtrl.login);

module.exports = router;