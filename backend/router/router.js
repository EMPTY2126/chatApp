import { Router } from "express";
import authController from "../controllers/authController.js";
import friendController from "../controllers/friendController.js"
import chatController from "../controllers/chatController.js";



export const router = Router();

router.post('/api/signup',authController.signup);
router.post('/api/login',authController.login);
router.get('/api/getfriends', authController.authenticator,friendController.getFriendList);
router.post('/api/newconversation', friendController.newConversation);
router.post('/api/getmessage',chatController.getMessages)


