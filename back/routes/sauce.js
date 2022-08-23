// Appel d'un routeur
const express = require('express');
const router = express.Router();

// Appel des middlewares
const auth = require('../middleware/auth')
const multer = require("../middleware/multer-config")

// Appel de la logique métier des sauces
const sauceCtrl = require("../controllers/sauce");

// Déclarations des routes des sauces
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Déclaration de la route des likes
router.post('/:id/like', sauceCtrl.updateLike);

module.exports = router;