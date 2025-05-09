import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import session from 'express-session'
import logger from 'morgan'
import passport from 'passport'
import path from 'path'
import configurePassport from './config/passport.config'

import authRouter from './routes/auth'
import clipboardsRouter from './routes/clipboards'
import conversationsRouter from './routes/conversations'
import filesRouter from './routes/files'
import usersRouter from './routes/users'

const app: Express = express()
const staticUploadsPath = path.join(process.cwd(), 'public', 'uploads')
dotenv.config()

app.use(
	cors({
		origin: ['http://localhost:5173'],
		credentials: true,
	}),
)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(staticUploadsPath))
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'YOUR_SESSION_SECRET',
		resave: false,
		saveUninitialized: false,
		cookie: { secure: process.env.NODE_ENV === 'production' },
	}),
)

configurePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/conversations', conversationsRouter)
app.use('/users', usersRouter)
app.use('/clipboards', clipboardsRouter)
app.use('/auth', authRouter)
app.use('/files', filesRouter)

export default app
