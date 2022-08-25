//Importation de Express :
//Appel de Express pour crée le router de chaque midellware :
const router = require('express').Router();

//importation du middleware/auth :
const auth = require('../middleware/auth');

//Importation du fichier multer de middlware pour la gestion des fichier images:
const multer = require('../middleware/multer');

//Importation de fichier post.js de controllers :
const postControllers = require('../controllers/post');

//Importation de fichier like.js de controllers :
const likeControllers = require("../controllers/like")



//Route POST :
router.post('/', auth, multer, postControllers.createOnePost);


//Route PUT :
router.put('/:id', auth, multer, postControllers.modifyOnePost);


//Route DELETE :
router.delete('/:id', auth, postControllers.deleteOnePost);


//Route GET :
router.get('/', auth, postControllers.getAllPost);


//Route GET :
router.get('/:id', auth, postControllers.getOnePost);


//Route POST :
router.post("/:id/like" , auth, likeControllers.likePost);



//Exportation du fichier post.js de routes :
module.exports = router;