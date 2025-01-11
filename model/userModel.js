import mongoose from "mongoose";

const userModelScheema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    todo:[{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId()  // Automatically generate an ObjectId for each todo item
        },
        message: {
          type: String,
          required: true
        }
      }
    ]
})

export default mongoose.model('users',userModelScheema)