import express, { Router } from 'express'
import passport from 'passport'
import { registerUser } from '../controllers/auth/auth'
const router: Router = express.Router()

router.post('/register', registerUser)

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
