import { Router } from "express";
import authController from "../controllers/authController.js";
import friendController from "../controllers/friendController.js"
import chatController from "../controllers/chatController.js";



export const router = Router();

router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.get('/getfriends/:userId',friendController.getFriendList);
router.post('/newconversation', friendController.newConversation);
router.post('/getmessage',chatController.getMessages);