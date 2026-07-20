import { Router } from 'express'
import { loginController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'
const userRouter = Router()

// xử lí post login -> loginValidator -> loginController
userRouter.post('/login', loginValidator, loginController)

export default userRouter
