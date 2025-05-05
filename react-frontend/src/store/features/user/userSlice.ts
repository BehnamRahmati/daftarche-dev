import { TUser } from '@/lib/types'
import { createSlice } from '@reduxjs/toolkit'
import { checkAuthStatus, login, logout, register } from './user-thunks'

type TUserState = {
	user: TUser | null
	isLoading: boolean
	error: string
}

const initialState: TUserState = {
	user: null,
	isLoading: false,
	error: '',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload
		},
		setError: (state, action) => {
			state.error = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.isLoading = true
				state.error = ''
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || 'Failed to login user'
				state.user = null // Ensure user is null on login failure
			})
			.addCase(register.pending, state => {
				state.isLoading = true
				state.error = ''
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				// Optionally log the user in immediately after registration
				state.user = action.payload.user
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || 'Failed to register user'
			})
			// Add cases for checkAuthStatus
			.addCase(checkAuthStatus.pending, state => {
				state.isLoading = true
				state.error = ''
			})
			.addCase(checkAuthStatus.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user // Set user based on response (could be null)
			})
			.addCase(checkAuthStatus.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || 'Failed to check auth status'
				state.user = null // Ensure user is null on auth check failure
			})
			.addCase(logout.pending, state => {
				state.isLoading = true
				state.error = ''
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || 'Failed to logout'
			})
	},
})

export default userSlice.reducer
export const { setUser, setLoading, setError } = userSlice.actions
