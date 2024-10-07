import { Router } from "express";
import controller from "../controllers/controller.js";

export const router = Router();

router.post('/api/signup',controller.signup)
router.get('/api/login',controller.login)



