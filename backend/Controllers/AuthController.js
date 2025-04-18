const bcrypt=require('bcrypt');
const UserModel=require('../Models/user')
const jwt=require('jsonwebtoken');
const signup=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message:'User already exists.Please login',success:false})
        }
        const userModel=new UserModel({name,email,password});
        userModel.password=await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201).json({message:'signup successfully',success:true});

    }
    catch(err){
        res.status(500).json({message:'internal server error',success:true});
    }
}
const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email});
        const errorMessage='Auth failed email or password is incorrect';
        if(!user){
            return res.status(403)
            .json({message: errorMessage,success:false})
        }
        const isPassEqual=await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403)
            .json({message: errorMessage,success:false}) 
        }
        const jwToken=jwt.sign({email: user.email,_id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        res.status(200).json({message:'login successfully',success:true,
            jwToken,
            email,
            name:user.name 
        });

    }
    catch(err){
        res.status(500).json({message:'internal server error',success:true});
    }
}
module.exports={
    signup,login
}