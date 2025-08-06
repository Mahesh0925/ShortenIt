import express from "express";
import { createUrl, fetchUrl, getTopUrls } from "../controller/Url.js";
import WrapAsync from "../utils/WrapAsync.js";
import { requireAuth } from "../middleware/auth.js";

const urlRouter = express.Router();


// POST route to create a short URL
urlRouter.post('/short-url',requireAuth, WrapAsync(createUrl));

// Optional: Top clicked links
urlRouter.get('/top',requireAuth, WrapAsync(getTopUrls));

// GET route to redirect using short ID
urlRouter.get('/:id',WrapAsync(fetchUrl));

export default urlRouter;
