import express from 'express'
const router = express.Router()

import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "Too many requests from this IP address, please try again later"
})

import { register, login, updateUser, test } from "../controllers/authController.js";

router.route('/register').post(limiter,register)
router.route('/login').post(limiter,login)
router.route('/updateUser').patch(updateUser)
router.route('/test').get(test)

export default router
