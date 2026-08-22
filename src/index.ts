import express from 'express'
import { config } from 'dotenv'
import userRouter from './routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import staticRouter from './routes/static.routes'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import cors from 'cors'
config()

databaseService.connect()
const app = express()
const port = process.env.PORT || 4000
app.use(cors())
// Tạo folder upload
initFolder()

// Sử dụng để định dạng xử lí data json (app handler)
app.use(express.json())
// -> Chuyển vào users để xử lí tài khoản (routes handler)
app.use('/users', userRouter)
//Api cho upload ảnh
app.use('/medias', mediasRouter)

app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
