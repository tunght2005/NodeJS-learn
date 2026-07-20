import express from 'express'
import userRouter from './routes/users.routes'

const app = express()
const port = 3000

// Sử dụng để định dạng xử lí data json (app handler)
app.use(express.json())
// -> Chuyển vào users để xử lí tài khoản (routes handler)
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
