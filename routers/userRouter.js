import express from "express";
const router = express.Router()
import {getUser, getUserPosts, addUserFriend, getUserFriends, deleteUserFriend, checkFriend, getFollowingPost} from "../controllers/userController.js"

router.route('/getUser').post(getUser)
router.route('/getUserPosts').post(getUserPosts)
router.route('/add').post(addUserFriend)
router.route('/getFriends').post(getUserFriends)
router.route('/del').post(deleteUserFriend)
router.route('/checkFriend').post(checkFriend)
router.route('/getFollowingPosts').post(getFollowingPost)

export default router  