import express from "express";
import { signup , signin,googleAuth,getUser,subscribe,unsubscribe } from "../Controllers/user.js";
import { Authentication } from "../Auth.js";

const router = express.Router();
//CREATE A USER
router.post("/signup", signup);

//SIGN IN
router.post("/signin", signin);

 //GOOGLE AUTH
 router.post("/google", googleAuth);
 router.get("/getuser/:id", getUser);
 router.put("/sub/:id", Authentication, subscribe);
 //unsubscribe a user
router.put("/unsub/:id", Authentication, unsubscribe);

export default router;
