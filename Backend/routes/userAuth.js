import express from "express";
import { signUp,login,logOut, getUser } from "../controller/userAuth.js";
import wrapAsync from "../utils/WrapAsync.js";

const router = express.Router();

router.post("/signUp",wrapAsync(signUp));
router.post("/login", wrapAsync(login));
router.get("/logOut", wrapAsync(logOut));
router.get("/me",getUser);

export default router;