// Import necessary modules
import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import prisma from '../lib/prisma'

export default function configurePassport() {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			async (email, password, done) => {
				try {
					const user = await prisma.user.findUnique({ where: { email } })

					if (!user || !user.hashedPassword) {
						return done(null, false, { message: 'Incorrect email or password.' })
					}

					const isMatch = await bcrypt.compare(password, user.hashedPassword)

					if (isMatch) {
						return done(null, user)
					} else {
						return done(null, false, { message: 'Incorrect email or password.' })
					}
				} catch (err) {
					return done(err)
				}
			},
		),
	)

	passport.serializeUser((user: any, done) => {
		done(null, user.id)
	})

	passport.deserializeUser(async (id: string, done) => {
		try {
			const user = await prisma.user.findUnique({ where: { id: id } })
			done(null, user)
		} catch (err) {
			done(err)
		}
	})
}
