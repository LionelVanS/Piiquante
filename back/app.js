// Appel des dependances
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

// Appel des routes
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')

// Création de l'application express
const app = express()

// Obtention des réponses en objet json
app.use(express.json())

// Connection à la base de données mongoDB Atlas 
// avec dotenv pour sécuriser les identifiants
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zqxd8ds.mongodb.net/test?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Modification des headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  })

// Gestionnaire de routage
app.use('/images', express.static(path.join(__dirname, 'images')))

// Déclaration des routes
app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)


module.exports = app