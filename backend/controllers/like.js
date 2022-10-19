//imporation modèle de la base de donnée :
const Post = require('../models/Post');


exports.likePost = (req, res, next) => { 
   
  //Aller l'objet post dans la base de donée :
  Post.findOne({_id: req.params.id})
  .then((post) => {      

    if(!post.usersLiked.includes(req.params.userId)){

    //Mettre à jour la Base de donée MongoDB :
      Post.updateOne(
        {_id: req.params.id},
        {
          $inc: {likes: 1},

          $push: {usersLiked: req.params.userId}
        }
      )
      .then(() => res.status(200).json({message : "Post like +1"}))
      .catch((error) => res.status(400).json({error}));
    }


    else {
    
    //Mettre à jour la Base de donée MongoDB :
      Post.updateOne(
        {_id: req.params.id},
        {
          $inc: {likes: -1},

          $pull: {usersLiked: req.params.userId}
        }
      )
      .then(() => res.status(200).json({message : "Post like 0"}))
      .catch((error) => res.status(400).json({error}));
    }

  })  
  .catch((error) => res.status(404).json({error}));
};