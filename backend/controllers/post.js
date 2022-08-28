//Importation du fichier Post de models :
const Post = require('../models/Post');

//inportation du fs de node.js :
const fs = require('fs');




//Logique POST :
exports.createOnePost = (req, res, next) => {
    
  const postObject = JSON.parse(req.body.post);
  
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
    
  //enregistrer l'objet dans la base de donné en appelant la méthode save :
  post.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })});
}




//Logique PUT :

exports.modifyOnePost = (req, res, next) => {
  //si on modifie le fichier image, récupérer le nom du fichier image post actuelle pour la suppréssion,
  //pour éviter d'avoir un fichier inutile dans le dossier images :

  if(req.file){
    Post.findOne({ _id: req.params.id})
    .then(post => {
      const filename = post.imageUrl.split("/images")[1];

      //suppression de l'image de la post car elle va être remplacer par la nouvelle image de post :
      fs.unlink(`images/${filename}`, (err) => {
        if(err) throw err;
      })

    })
    .catch(error => res.status(400).json({error}));  
  };

  
  //l'objet qui va être envoyé dans la base de donnée :
  const postObject = req.file ?

  {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } :
  { ...req.body};


  //update dans la base de donnée :
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id }) 
    .then(() => res.status(200).json({ message: "objet mise à jour" }))
    .catch((error) => res.status(404).json({ error }));
}







//Logique DELETE :

exports.deleteOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];

      fs.unlink(`images/${filename}`, () => {

      Post.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: `l'objet ${req.params.id} a été supprimé` }))
        .catch((error) => res.status(404).json({ error }));
    });

  })
  .catch(error => res.status(500).json({error}));  
}






//Logique GET avec Find :

exports.getAllPost = (req, res, next) => {
  //utilisation de la méthode find() pour avoir la liste complète :
  Post.find().sort({date: -1})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
}






//Logique GET avec OneFind :

exports.getOnePost =  (req, res, next) => {
  //pour accéder à l'id, req.params.id :
  
  Post.findOne({_id: req.params.id})
    .then(post => res.status(200).json(post))
    .catch((error) => res.status(400).json({error}));
}
