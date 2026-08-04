import express, { Request, Response, NextFunction } from 'express'
import userRouter from './routes/users.routes'
import databaseService from '~/services/database.services'

databaseService.connect()
const app = express()
const port = 3000

// Sử dụng để định dạng xử lí data json (app handler)
app.use(express.json())
// -> Chuyển vào users để xử lí tài khoản (routes handler)
app.use('/users', userRouter)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
