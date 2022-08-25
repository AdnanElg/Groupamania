//Importation du package validator :
const validator = require('validator');

//Contrôle du champ email :
module.exports = (req, res, next) => {
    const email = req.body.email;

    if(validator.isEmail(email)){
        next()
    }

    else{
        return res.status(400).json({error : `l'email ${email} n'est pas valide`})
    }
}