import { Router } from "express";
import authController from "../controllers/authController.js";
import friendController from "../controllers/friendController.js"


export const router = Router();

router.post('/api/signup',authController.signup);
router.post('/api/login',authController.login);
router.get('/api/getfriends', authController.authenticator,friendController.getFriendList);
router.post('/api/iknow', async (req,res)=>{
    await friendController.newConversation(req.body.senderId,req.body.reciverId);
    res.status(200).json({msg:'hiii'});
})




