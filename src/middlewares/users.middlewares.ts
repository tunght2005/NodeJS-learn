import { Request, Response, NextFunction } from 'express'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  // Nhận data định dạng json lấy data body gửi lên
  console.log(req.body)
  const { email, password } = req.body
  // Kiểm tra thông tin nếu hợp lệ thì -> loginController ngược lại thì trả về error
  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing email or password'
    })
  }
  next()
}
