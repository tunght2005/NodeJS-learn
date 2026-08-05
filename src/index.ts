import express from 'express'
import userRouter from './routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

databaseService.connect()
const app = express()
const port = 3000

// Sử dụng để định dạng xử lí data json (app handler)
app.use(express.json())
// -> Chuyển vào users để xử lí tài khoản (routes handler)
app.use('/users', userRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
