import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

const app = express()

app.use(cors({origin: process.env.CORS_ORIGIN}))
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true , limit : '15kb'}))
app.use(cookieParser())
app.use(express.static('public'))

import dashboardRouter from './routes/dashboard.routes.js'
import userRouter from './routes/user.routes.js'
app.use('/api/v1/app' , dashboardRouter )
app.use('/api/v1/users' , userRouter )

export { app }

