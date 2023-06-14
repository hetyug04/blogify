import express from "express";
const router = express.Router()
import { post, updatePost, getAllPosts, getPost, deletePost} from "../controllers/postController.js";

import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "Too many requests from this IP address, please try again later"
})

router.route('/post').post(limiter,post)
router.route('/updatePost').patch(updatePost)
router.route('/getAllPosts').get(getAllPosts)
router.route('/getPost').post(getPost)
router.route('/deletePost').delete(deletePost)

export default router
