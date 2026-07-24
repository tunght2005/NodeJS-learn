import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'

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

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: true, // Không được bỏ trống tên
      isString: true, // Định dạng chuỗi
      trim: true, // Loại bỏ khoảng trắng
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      } // Độ dài name 1-100
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true
      //Nếu tốt thì tạo thêm 1 checkEmailExist để kiếm tra email có trùng với email trong db hay không
      // Ví dụ tạo 1 hàm async checkEmailExist(email: string) {
      //     const user = await database.users.findOne({
      //         email
      //     })

      //     return Boolean(user)
      // } Để kiểm tra email có trong db hay không ở folder services
      // custom: {
      //   options: async (value, { req }) => {
      //     const isExist = await usersService.checkEmailExist(value)
      //     if (isExist) {
      //       throw new Error('Email already exists')
      //     }
      //     return true
      //   }
      // }
    },
    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 50
        }
      }
      // Kiểm tra độ mạnh của mk
      // isStrongPassword: {
      //   options: {
      //     minLength: 6,
      //     minLowercase: 1,
      //     minUppercase: 1,
      //     minNumbers: 1,
      //     minSymbols: 1
      //   },
      // errorMessage: 'Password not strong'
      // }
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 50
        }
      },
      // isStrongPassword: {
      //   options: {
      //     minLength: 6,
      //     minLowercase: 1,
      //     minUppercase: 1,
      //     minNumbers: 1,
      //     minSymbols: 1
      //   },
      // errorMessage: 'Password not strong'
      // }
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
          }
          return true
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
