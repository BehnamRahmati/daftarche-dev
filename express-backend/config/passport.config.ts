// Import necessary modules
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';

export default function configurePassport() {
    // --- Local Strategy (Username/Password) ---
    passport.use(new LocalStrategy(
        {
            usernameField: 'email', // Or 'username', depending on your login form field
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                // 1. Find the user by email (or username) in the database
                const user = await prisma.user.findUnique({ where: { email } });

                // 2. If user not found, return error
                if (!user || !user.hashedPassword) {
                    return done(null, false, { message: 'Incorrect email or password.' });
                }

                // 3. Compare the provided password with the stored hashed password
                const isMatch = await bcrypt.compare(password, user.hashedPassword); // Assuming user.password is the hashed password

                // 4. If passwords match, return the user object
                if (isMatch) {
                    return done(null, user);
                } else {
                    // 5. If passwords don't match, return error
                    return done(null, false, { message: 'Incorrect email or password.' });
                }
            } catch (err) {
                // 6. Handle potential errors during database lookup or bcrypt comparison
                return done(err);
            }
        }
    ));

    // --- Session Management (Serialization/Deserialization) ---
    // Required if you are using sessions (typical for web apps)
    // Stores user ID in the session
    passport.serializeUser((user: any, done) => { // Use Express.User or your User type if available
        done(null, user.id); // Store only the user ID in the session
    });

    // Retrieves user details from the session using the stored ID
    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await prisma.user.findUnique({ where: { id: id } });
            done(null, user); // Attach user object to req.user
        } catch (err) {
            done(err);
        }
    });

    // --- Optional: JWT Strategy (Stateless Authentication) ---
    // If you prefer JWT instead of sessions:
    // 1. Install passport-jwt and jsonwebtoken: npm install passport-jwt jsonwebtoken @types/passport-jwt @types/jsonwebtoken
    // 2. Configure JWT Strategy here (using JwtStrategy from 'passport-jwt')
    //    - Define how to extract the token (e.g., from Auth header)
    //    - Define how to verify the token (using your secret key)
    //    - Define how to find the user based on the token payload
    /*
    import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
    import jwt from 'jsonwebtoken';

    passport.use(new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'YOUR_SECRET_KEY' // Use environment variable!
        },
        async (jwtPayload, done) => {
            try {
                const user = await prisma.user.findUnique({ where: { id: jwtPayload.sub } }); // 'sub' usually holds the user ID
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err, false);
            }
        }
    ));
    */
}