const PasswordValidator = require('password-validator')
const password = require('password-validator');
const { schema } = require('../models/user');

// 
const passwordSchema = new PasswordValidator()

// Création du mot de passe

passwordSchema                                          
.is().min(5)                                    // Il doit contenir au minimum 5 caractères
.is().max(12)                                   // Il doit contenir au maximum 12 caractères
.has().uppercase()                              // Il doit contenir des majuscules
.has().lowercase()                              // Il doit contenir des minuscules
.has().digits(1)                                // Il doit contenir au moins un chiffre
.has().not().spaces()                           // Il ne doit pas contenir d'espace
.is().not().oneOf(['Passw0rd', 'Password123']); // Ces mots de passes sont interdits

// Vérification du mot de passe
exports.passwordValidation = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next()
    } else {
        res.status(400).json({ message: "Le mot de passe n'est pas assez fort" })
    }
}