import { backendurl } from '@/lib/env'
import { TUser } from '@/lib/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TError } from './user-slice'

type registerPayload = {
	message: string
	user: TUser
}

type loginPayload = {
	message: string
	user: TUser
}

type checkAuthStatusPayload = {
	user: TUser | null
}
type logoutPayload = {
	message: string
}

export const login = createAsyncThunk<
	loginPayload,
	{ email: string; password: string },
	{ rejectValue: TError }
>('user/login', async (loginData, { rejectWithValue }) => {
	try {
		const response = await fetch(`http://localhost:3000/auth/login-json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginData),
			credentials: 'include',
		})
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue({
				message: errorData.message || 'Failed to login user',
				code: errorData.code,
			})
		}
		const data: loginPayload = await response.json()
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred during login.',
		})
	}
})

export const register = createAsyncThunk<
	registerPayload,
	{ email: string; password: string; name: string },
	{ rejectValue: TError }
>('user/register', async (registerData, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(registerData),
			credentials: 'include',
		})
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue({
				message: errorData.message || 'Failed to register user',
				code: errorData.code,
			})
		}
		const data: registerPayload = await response.json()
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred while registering user',
		})
	}
})

export const checkAuthStatus = createAsyncThunk<
	checkAuthStatusPayload,
	void,
	{ rejectValue: TError }
>('user/checkAuthStatus', async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/auth/status`, {
			// Assuming this endpoint exists
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include', // Important to send cookies
		})

		if (!response.ok) {
			if (response.status === 401) {
				return { user: null }
			}
			const errorData = await response.json().catch(() => ({}))
			return rejectWithValue({
				message: errorData.message || 'Failed to check status ',
				code: errorData.code,
			})
		}

		const data: checkAuthStatusPayload = await response.json()
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error('Auth status check error:', error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred while checking auth status',
		})
	}
})

export const logout = createAsyncThunk<logoutPayload, void, { rejectValue: TError }>(
	'user/logout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${backendurl}/auth/logout`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			})

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}))
				return rejectWithValue({
					message: errorData.message || 'Failed to logout ',
					code: errorData.code,
				})
			}
			// document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
			const data: logoutPayload = await response.json()
			return data
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error('logout error:', error)
			return rejectWithValue({
				message: error.message || 'An unexpected error occurred while loging out',
			})
		}
	},
)
