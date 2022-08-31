const validator = require('validator')

exports.emailValidation = (req, res, next) => {
    if(validator.isEmail(req.body.email)){
        next()
    } else {
        res.status(400).json({ message: "Ceci n'est pas une adresse mail valide" })
    }
}