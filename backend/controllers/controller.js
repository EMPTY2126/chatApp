import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {genHS,verifyHS} from '../utils/pwdGenVerify.js'
import User from '../db/userModel.js'

dotenv.config();
const SECRET = process.env.SECRET;

const signup = async (req,res)=>{
    const {userName,pwd,userEmail} = req.body; //get user detail
    if(!userName || !pwd) res.status(201).json({isSuccess:false,user:null,msg:"Invalid details"});

    const {hash,salt} = genHS(pwd); //generate hash and salt 
    const newUser = new User({  // creating the new user
        userName,
        userImage:"nm",
        hash,salt,
        userEmail
    });
    try {
        await newUser.save(); // save the user in model and return user
        res.status(201).json({isSuccess:true,user:newUser,msg:"user created succesfully"});
    } catch (error) { //other error
        res.status(500).json({isSuccess:false,user:null,msg:"Internal server error"});
    }
}

const login = async(req,res)=>{
    const {userEmail,pwd} = req.body;
    if(userEmail==='' || pwd ==='') res.status(200).json({isSuccess:false,msg:'Invalid user details'});
    try{
        const user = await User.findOne({userEmail}); //destrecture data from request
        if(!user) res.status(200).json({isSuccess:false,msg:'user not found'}); //check for user
        else if(!verifyHS(pwd,user.hash,user.salt)) res.status(200).json({isSuccess:false,msg:'Wrong password'}); //verify password
        else { //if user exist and password is correct 
            const token = jwt.sign({userEmail:user.userEmail}, SECRET, {expiresIn:'1h'}); //JWT token
            res.cookie('token',token,{httpOnly: true, secure:true}); //setting cookie
            res.status(200).json({user,isSuccess:true,msg:'user Logged in successfully'}); // returning user deatil
        }
    }catch(error){ // any other error
        res.status(500).json({isSuccess:false,msg:'Internal server error'});
    }
}

const authenticator = (req,res,next)=>{
    const token = req.cookie.token; // get the cookie
    if(!token) res.status(400).json({msg:'Access denied'}); //check for token 
    
    jwt.verify(token,SECRET,(err,user)=>{ // verify token
        if(err) return res.status(403).json({msg:'Invaild token'}); // checks for any error in token
        req.user = user;
        next(); //procede next route
    });
}


export default{
    signup,
    login,
    authenticator
}