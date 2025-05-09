import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import prisma from '../../lib/prisma'
export async function registerUser(req: Request, res: Response, next: any) {
	const { email, password, name } = req.body

	if (!email || !password) {
		res.status(400).json({ message: 'Email and password are required' })
		return
	}

	try {
		const existingUser = await prisma.user.findUnique({
			where: { email: email },
		})

		if (existingUser) {
			res.status(409).json({ message: 'Email already in use' })
			return
		}

		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(password, saltRounds)

		const newUser = await prisma.user.create({
			data: {
				email: email,
				hashedPassword: hashedPassword,
				name: name,
			},
		})

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
}
