import express from 'express'
import signinController from '../controllers/auth/signinController.js'
import UserCreateController from '../controllers/auth/UserCreateController.js'
import LogoutController from '../controllers/auth/LogoutController.js'
import { roleAccess } from '../middlewear/roleAccess.middleware.js'
import userRoleConstant from '../config/constants/userRole.constant.js'
import ChangePassword from '../controllers/auth/ChangePassword.js'
import { isAuthenticated } from '../middlewear/tokenVerifier.middleware.js'

const authRouter = express.Router()

authRouter.post('/login', signinController)
authRouter.post('/changePassword', isAuthenticated, ChangePassword)

authRouter.post(
  '/createUser',
  isAuthenticated,
  roleAccess([userRoleConstant.WeHearCSR, userRoleConstant.ADMIN]),
  UserCreateController,
)
authRouter.post('/logout', LogoutController)

export default authRouter
