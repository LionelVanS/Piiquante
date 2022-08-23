// Appel des dépendances
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Déclarations du schéma utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Vérification de l'unicité de l'email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);