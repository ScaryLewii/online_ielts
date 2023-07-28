import NextAuth, { Awaitable, RequestInternal, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { env } from 'process'

// TODO:
// Using a secret auth token (maybe get from backend/API)

export const authOptions: any = {
	secret: env.AUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	providers: [
		Credentials({
			type: "credentials",
			credentials: {
				email: {label: "Email", type: "email"},
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				const payload = {
					"userName": credentials?.email,
					"password": credentials?.password,
				};

				const url = env.SIGNIN_API_URL || ""
				const res = await fetch(url, {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				})
				
				const resData = await res.json()
				if (!res.ok || !resData) {
					return null;
				}

				if (resData && !resData.isSuccess) {
					throw new Error(resData.errors[0].message)
				}

				return resData.data.token
			}
		})
	],
	pages: {
		signIn: '/login',
		// signOut: '/auth/signout',
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // (used for check email message)
		// newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
	}
}

export default NextAuth(authOptions)