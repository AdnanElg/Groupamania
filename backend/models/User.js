//Importation de Mongoose :
const mongoose = require('mongoose');

//Importation de uniqueValidator :
const uniqueValidator = require('mongoose-unique-validator')

//le modéle de base de donnée pour le signup/login (pour enregistrer un nouvel utilisateur) :
const userSchema = new mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    admin: { type: Boolean, default: false},
});

//sécurité conseillé pour ne pas enregistrer 2 fois la même adresse email dans la basse de donée :
// on applique la méthode plugin pour controler le mail :
userSchema.plugin(uniqueValidator);


//Exportation du userSchema : 
module.exports = mongoose.model('User', userSchema);