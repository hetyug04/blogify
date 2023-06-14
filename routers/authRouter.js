import express from 'express'
const router = express.Router()

import { register, login, updateUser, test } from "../controllers/authController.js";

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(updateUser)
router.route('/test').get(test)

export default router
