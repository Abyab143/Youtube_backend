import express from 'express';
import {create,addView,getVideo,getByTag,random,search,sub,trend} from "../Controllers/Vidio.js";
import { Authentication } from '../Auth.js';

const router = express.Router();
router.post("/", Authentication, create)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub",Authentication, sub)
router.get("/tags", getByTag)
router.get("/search", search);

export default router;