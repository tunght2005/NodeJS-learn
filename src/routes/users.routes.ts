import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'
const userRouter = Router()

// xử lí post login -> loginValidator -> loginController
userRouter.post('/login', loginValidator, loginController)
userRouter.post('/register', registerController)
export default userRouter
