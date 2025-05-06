import { TUser } from '@/lib/types'
import { createSlice } from '@reduxjs/toolkit'
import { checkAuthStatus, login, logout, register } from './user-thunks'

export type TError = {
	message: string
	code?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	details?: any
} | null

type TUserState = {
	user: TUser | null
	isLoading: boolean
	error: TError
}

const initialState: TUserState = {
	user: null,
	isLoading: false,
	error: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || { message: 'Failed to login user' }
				state.user = null
			})
			.addCase(register.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || { message: 'Failed to register user' }
			})
			.addCase(checkAuthStatus.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(checkAuthStatus.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
			.addCase(checkAuthStatus.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || { message: 'Failed to check auth status' }
				state.user = null
			})
			.addCase(logout.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.error = null
				state.user = null
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || { message: 'Failed to logout' }
			})
	},
})

export default userSlice.reducer
