// Appel de la dépendance
const fs = require("fs")

// Appel du modele pour créer les sauces
const Sauce = require('../models/sauce')

// Création de nouvelles sauces
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)

    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    })

    sauce.save()
        .then(() => res.status(201).json({ message : ' Objet créé' }))
        .catch(error => res.status(400).json({ error }))    
}   

// Récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => { res.status(200).json(sauces)})
        .catch(error => res.status(400).json({ error }))
}

// Récupération d'une seule sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {return res.status(200).json(sauce)})
        .catch(error => res.status(404).json({ error }))
}

// Modification d'une sauce
exports.updateSauce = (req, res, next) => {
    const modifiedSauce = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }

    
    Sauce.findOne({ _id: req.params.id })
        .then(() => {
            if (modifiedSauce.userId != req.auth.userId) {
                res.status(401).json({ message : "Non autorisé"})
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...modifiedSauce, _id: req.params.id})
                    .then(() => res.status(200).json({ message : "Objet modifié!" }))
                    .catch(error => res.status(401).json({ error }))
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        })
}

// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId = req.auth.userId) {
                const filename = sauce.imageUrl.split("/images/")[1]
                fs.unlink(`images/${filename}`, () => {
                    sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: "Sauce supprimée" })})
                        .catch(error => res.status(400).json({ error }))
                    })
            } else {
                res.status(401).json({ message: "Non autorisé" })
            }
        })
        .catch(error => res.status(404).json({ error }))
}

// Gestion des likes et des dislikes
exports.updateLike = (req, res, next) => {
    const sauceId = req.params.id
    const userId = req.body.userId
    const like = req.body.like
   
    Sauce.findOne({ _id: sauceId })
        .then(sauce => {
            if(like === 1){

                Sauce.updateOne({ _id: sauceId }, {$inc: {likes: 1}, $push: { usersLiked: userId }})
                    .then(() => res.status(200).json({ message: "Vous aimé cette sauce" }))
                    .catch(() => res.status(400).json({ error }))

            } else if(like === 0){
                if(sauce.usersLiked.includes(userId)){
                    Sauce.updateOne({ _id: sauceId }, { $inc: { likes: -1 }, $pull: { usersLiked: userId }})
                    .then(() => res.status(200).json({ message: "Vous avez supprimé votre like" }))
                    .catch(() => res.status(400).json({ error }))
                } else if(sauce.usersDisliked.includes(userId)){
                    Sauce.updateOne({ _id: sauceId }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId }})
                    .then(() => res.status(200).json({ message: "Vous avez supprimé votre dislike" }))
                    .catch(() => res.status(400).json({ error }))
                } 

            } else if(like === -1){
                Sauce.updateOne({ _id: sauceId }, { $inc: { dislikes: 1 }, $push: { usersDisliked: userId }})
                .then(() => res.status(200).json({ message: "Vous n'aimé pas cette sauce" }))
                .catch(() => res.status(400).json({ error }))
            }
        })
        .catch(error => res.status(400).json({ error }))
}