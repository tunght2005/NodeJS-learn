import { Request, Response } from 'express'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

// xử lí các logic và xử lí database
export const loginController = (req: Request, res: Response) => {
  console.log(req.body)
  const { email, password } = req.body
  if (email == 'tunght123@gmail.com' && password == '12345') {
    return res.status(200).json({
      message: 'Login success'
    })
  }
  return res.status(400).json({
    error: 'Login failed'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  console.log(req.body)
  try {
    const result = await usersService.register(req.body)
    return res.status(200).json({
      message: 'Register success',
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Register failed',
      error
    })
  }
}
