import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../utils/multer.js";
const router = Router();

router.post("/register", upload.fields([{
    name : "avatar",
    maxxount : 1
},
{
    name : "coverimage",
    maxCount : 1
}
]), registerUser);

export default router;
