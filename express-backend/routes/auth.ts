import bcrypt from 'bcrypt'
import express, { Router } from 'express'
import passport from 'passport'
import prisma from '../lib/prisma'
const router: Router = express.Router()

router.post('/register', async (req, res, next) => {
	const { email, password, name } = req.body

	if (!email || !password) {
		res.status(400).json({ message: 'Email and password are required' })
		return
	}

	try {
		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email: email },
		})

		if (existingUser) {
			res.status(409).json({ message: 'Email already in use' })
			return
		}

		// Hash the password
		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(password, saltRounds)

		// Create the new user
		const newUser = await prisma.user.create({
			data: {
				email: email,
				hashedPassword: hashedPassword,
				name: name,
			},
		})

		// Exclude password from the response
		const { hashedPassword: _, ...userWithoutPassword } = newUser

		req.login(newUser, err => {
			if (err) {
				console.error('Login error after registration:', err)
				res.status(500).json({
					message: 'Internal server error during login after registration',
				})
				return
			}
			return res.status(201).json({
				message: 'User created and logged in successfully',
				user: userWithoutPassword,
			})
		})
	} catch (error) {
		console.error('Registration error:', error)
		return next(error)
	}
})

router.post(
	'/login',
	passport.authenticate('local', {
		failureMessage: true,
	}),
	(req, res) => {
		res.status(200).json({ message: 'Login successful', user: req.user })
	},
)

// Or handle failure explicitly without redirects:
router.post('/login-json', (req, res, next) => {
	passport.authenticate('local', (err: any, user: Express.User | false | null, info: any) => {
		if (err) {
			return next(err)
		}
		if (!user) {
			// Authentication failed
			return res.status(401).json({ message: info?.message || 'Login failed' })
		}
		// Authentication succeeded, log the user in manually (establishes session)
		req.logIn(user, err => {
			if (err) {
				return next(err)
			}
			// Send success response
			return res.status(200).json({ message: 'Login successful', user: req.user })
		})
	})(req, res, next)
})

router.post('/logout', (req, res, next) => {
	req.logout(err => {
		// req.logout requires a callback function
		if (err) {
			return next(err)
		}
		req.session.destroy(err => {
			// Optional: Destroy the session completely
			if (err) {
				console.error('Failed to destroy session during logout.', err)
			}
			res.clearCookie('connect.sid')
			res.status(200).json({ message: 'Logout successful' })
		})
	})
})

router.get('/status', (req, res) => {
	if (req.isAuthenticated()) {
		const { hashedPassword: _, ...userWithoutPassword } = req.user as any
		res.status(200).json({ authenticated: true, user: userWithoutPassword })
	} else {
		res.status(200).json({ authenticated: false, user: null })
	}
})

export default router
