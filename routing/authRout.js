import express from 'express'
import { deleteTodo, findUser, loginControll, registerController, updatedTodo, updateUserProfile } from '../controller/auth-conroller.js'
const Routing=express.Router()
Routing.post('/register',registerController)
Routing.post('/login',loginControll)
Routing.get('/finduser/:id',findUser)
Routing.patch('/updatedtodo/:id',updatedTodo)
Routing.delete('/deletetodo/:id/:todoId', deleteTodo);
Routing.patch('/updateprofile/:id',updateUserProfile)
export default Routing