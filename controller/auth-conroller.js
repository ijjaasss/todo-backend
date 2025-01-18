import mongoose from "mongoose"
import { comparePassword, hashedPasword } from "../helper/authhelper.js"
import userModel from "../model/userModel.js"


export const registerController= async( req,res)=>{

try {
    console.log(1);
    
    const {email,password,phone,name}=req.body
 console.log(req.body);
 
    if(!email){
        return res.send({message:'email is requird'})
    }
    if(!password){
        return res.send({message:'password is requird'})
    }
    if(!phone){
        return res.send({message:'number is requird'})
    }
    if(!name){
        return res.send({message:'name is requird'})
    }
    const existingUser= await userModel.findOne({email})
    if(existingUser){
        console.log(existingUser)
        return res.send({
            success:false,
            message:'alredy registerd the email'
        })
    }
    const hashedPasswordi=await hashedPasword(password)
    const user = await new userModel({email,password:hashedPasswordi,phone,name}).save()
    res.status(201).send({
        success:true,
        message:"registerd success fully",
        user
    })
} catch (error) {
    console.log(error);
    
}
}

export const loginControll= async (req,res)=>{
try {
    
    
    const {email,password}=req.body;
   
    if(!email||!password){
        return res.status(400).send({
   success:false,
   message:"email and password requird"
        })
    }
    const user =await userModel.findOne({email})
    if(!user){
        return res.status(400).send({
            success:false,
            message:'email not fount '
        })
    }
    const match= await comparePassword(password,user.password)
    if(!match){
        return res.status(400).send({
            success:false,
            message:'invalid password'
        })
    }
    res.status(200).send({
        success:true,
        message:'login successfully',
        user
    })
} catch (error) {
    
}
}

export const findUser= async(req,res)=>{
  try {
   
    const {id}=req.params
    
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID' });
    }
    const user= await userModel.findById(id)
    if(user){
        res.send(user);
        }
        res.status(200)
  } catch (error) {
    console.log(error)
  }
}

export const updatedTodo =async(req,res)=>{
   
   const {id}=req.params
   const { todo } = req.body;
  console.log(todo)
   
   if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
   const user=await userModel.findById(id)



   user.todo=todo
   await user.save();
res.status(200).json({ message: 'add task successfully', user });
}


 export const deleteTodo= async(req,res)=>{
 try {
    const {id,todoId}=req.params


    
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid user ID' });
      }
  
      
      if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
        return res.status(400).send({ message: 'Invalid todo ID' });
      }
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      const removedTodo = user.todo.pull(todoId);
      
      if (removedTodo.length === 0) {
        return res.status(404).send({ message: 'Todo item not found' });
      }
      await user.save();
    

      res.status(200).send({
        success: true,
        message: 'Todo item deleted successfully',
        user
      });
 } catch (error) {
    console.log(error);
    
 }
}

export const updateUserProfile= async (req,res)=>{
try {
    const {id}=req.params
const {name,email,phone}=req.body
   if(!id|| !mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({message:'Invalid userID',success:false})
  }
  if(!name&&!email&&!phone){
return res.status(400).json({message:'At least one field (name, email, or phone) must be provided to update.',success:false})
  }
  const user=await userModel.findById(id)
  if(!user){
    return res.status(400).json({message:'user not found',success:false})
  }
  if(name)user.name=name
  if(email)user.email=email
  if(phone)user.phone=phone
  await user.save()
  res.status(200).json({message:'user profile updated success fully',success:true,user})
} catch (error) {
    console.log(error);
    
}
}