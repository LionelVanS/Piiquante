// Appel d'un routeur
const express = require('express');
const router = express.Router();

// Appel de limite d'essai de connexion
const rateLimit = require('../middleware/rateLimit')

// Appel du middleware password validator
const password = require('../middleware/password')

// Appel du contrôleur utilisateur
const userCtrl = require('../controllers/user');

// Déclaration des routes utilisateur
router.post('/signup', password.passwordValidation, userCtrl.signup);
router.post('/login', rateLimit, userCtrl.login);

module.exports = router;