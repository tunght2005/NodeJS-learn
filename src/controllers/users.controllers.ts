import { Request, Response } from 'express'

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
