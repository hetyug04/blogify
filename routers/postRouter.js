import express from "express";
const router = express.Router()
import { post, updatePost, getAllPosts, getPost, deletePost} from "../controllers/postController.js";

router.route('/post').post(post)
router.route('/updatePost').patch(updatePost)
router.route('/getAllPosts').get(getAllPosts)
router.route('/getPost').post(getPost)
router.route('/deletePost').delete(deletePost)

export default router