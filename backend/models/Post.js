//Importation de Mongoose :
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    //formulaire post :
    userId: {type: String, required: true},
    message: {type: String, required: true, maxlength: 1000},
    imageUrl: {type: String, required: true},
    date : {type: Date, default: Date.now},
    
    //Systéme de like :
    likes: {type: Number, default: 0},
    usersLiked : { type: [String] },
});



//Exportation de postSchema :
module.exports = mongoose.model('Post', postSchema);