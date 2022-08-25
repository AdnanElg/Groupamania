//Importation de Express :
//Appel de Express pour crée le router de chaque midellware :
const router = require('express').Router();

//Importation de fichier user.js de controllers :
const userControllers = require('../controllers/user');

//importation du middleware/email :
const email = require('../middleware/email');

//importation du middleware/password :
const password = require('../middleware/password');





//Router POST (signup) :
router.post('/signup', email, password, userControllers.signup);

//Router POST (login):
router.post('/login', userControllers.login);





//Exportation du fichier user.js de routes :
module.exports = router;