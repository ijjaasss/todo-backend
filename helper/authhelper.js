import bcrypt from 'bcrypt'
  
export const hashedPasword= async(password)=>{
    try {
        const saltRound=10
        const HashedPassword=await bcrypt.hash(password,saltRound)
        return HashedPassword
    } catch (error) {
        console.log(error);
        
    }
}
export const comparePassword=(password,hashedPassword)=>{
return bcrypt.compare(password,hashedPassword)
}