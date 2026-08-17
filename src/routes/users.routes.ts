import { Router } from 'express'
import {
  verifyEmailController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  resendVerifyEmailController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const userRouter = Router()

// xử lí post login -> loginValidator -> loginController
userRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/*
 * Description: Register a new user
 * Path: /register
 * Methob: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 */
userRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description. Logout a user
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description. Refresh token
 * Path: /refresh-token
 * Method: POST
 * Body: { refresh_token: string }
 */
userRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

/**
 * Description. Verify email when user client click on the link in email
 * Path: /verify-email
 * Method: POST
 * Body: { email_verify_token: string }
 */
userRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * Description. Verify email when user client click on the link in email
 * Path: /resend-verify-email
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: {}
 */
userRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))
export default userRouter
