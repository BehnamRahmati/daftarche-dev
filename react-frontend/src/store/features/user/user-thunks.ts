import { backendurl } from '@/lib/env'
import { TUser } from '@/lib/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

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
	{ rejectValue: string }
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
			return rejectWithValue(errorData.message || 'Failed to login user')
		}
		const data: loginPayload = await response.json()
		return data
	} catch (error) {
		console.log(error)
		return rejectWithValue('An unexpected error occurred while login user')
	}
})

export const register = createAsyncThunk<
	registerPayload,
	{ email: string; password: string; name: string },
	{ rejectValue: string }
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
			return rejectWithValue(errorData.message || 'Failed to register user') // Updated error message
		}
		const data: registerPayload = await response.json() // Use updated payload type
		return data
	} catch (error) {
		// Handle network errors or other exceptions
		console.log(error)
		return rejectWithValue('An unexpected error occurred while registering user') // Updated error message
	}
})

// New thunk to check authentication status
export const checkAuthStatus = createAsyncThunk<
	checkAuthStatusPayload,
	void, // No arguments needed for this thunk
	{ rejectValue: string }
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
			// If status is 401 or similar, it means not authenticated
			if (response.status === 401) {
				return { user: null } // Return null user explicitly for unauthenticated
			}
			const errorData = await response.json().catch(() => ({})) // Try to parse error, default to empty object
			return rejectWithValue(errorData.message || 'Failed to check auth status')
		}

		const data: checkAuthStatusPayload = await response.json()
		return data // Should contain { user: TUser } or { user: null }
	} catch (error) {
		console.error('Auth status check error:', error)
		return rejectWithValue('An unexpected error occurred while checking auth status')
	}
})

export const logout = createAsyncThunk<logoutPayload, void, { rejectValue: string }>(
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
				return rejectWithValue(errorData.message || 'Failed to logout')
			}
			// document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
			const data: logoutPayload = await response.json()
			return data
		} catch (error) {
			console.error('logout error:', error)
			return rejectWithValue('An unexpected error occurred while loging out')
		}
	},
)
