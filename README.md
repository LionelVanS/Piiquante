# HotTakes

Projet 6 - Construisez une API sécurisée

### Objectifs:

- Construire une API avec NodeJS et express.
- Créer une base de données NoSQL avec MongoDB Atlas.
- Appliquer les techniques de sécurisation d'une base de données.

## Pour commencer

Ce projet à été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.  
Pour commencer à utiliser l'application veuillez cloner ce repository.

### Pré-requis

- [NodeJs](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [MongoDb Atlas](https://www.mongodb.com/atlas/database)
- [Nodemon](https://www.npmjs.com/package//nodemon)

### Installation

Pour faire fonctionner l'application Express, veuillez taper la commande `npm install` dans le dossier back pour installer les dépendances.

Pour faire fonctionner le front end, installez les dépendances dans le dossier front avec la commande `npm install`.

Créez un fichier de variables d'environnement .env dans le dossier back. Le contenu de ce fichier doit être rempli comme ceci:

-DB_USERNAME = Doit contenir le nom d'utilisateur de votre base de donnée  
-DB_PASSWORD = Doit contenir le mot de passe de votre base de donnée  
-DB_DATABASE = Doit contenir l'hôte de votre base de données au format "votrehôte.mongodb.net"  
-JWT_SECRET = Doit contenir le mot de passe secret permettant de générer les tokens  
-JWT_ROUNDS = Doit contenir le nombre d'itérations pour le salage du mot de passe.

## Démarrage

Pour lancer le serveur, utiliser la commande `nodemon server` dans le dossier back.

Ensuite, utilisez la commande 'npm start' dans le dossier front pour lancer l'application et rendez vous sur l'adresse http://localhost:4200.

## Auteur

* **Lionel Van Schellebeck** _alias_ [@LionelVanS](https://github.com/LionelVanS)
