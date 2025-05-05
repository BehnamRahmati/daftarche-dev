import { TClipboard } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	addClipboard,
	AddClipboardPayload,
	deleteClipboards,
	editClipboard,
	fetchClipboards,
	FetchClipboardsPayload,
} from './clipboard-thunks'

type clipbordsState = {
	clipboards: TClipboard[] | []
	isLoading: boolean
	error: string | null
}

const initialState: clipbordsState = {
	clipboards: [],
	isLoading: false,
	error: null,
}

export const clipboardsSlice = createSlice({
	name: 'clipboards',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchClipboards.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(
				fetchClipboards.fulfilled,
				(state, action: PayloadAction<FetchClipboardsPayload>) => {
					state.isLoading = false
					// Replace state instead of merging if fetching all
					state.clipboards = action.payload.clipboards
					state.error = null
				},
			)
			.addCase(fetchClipboards.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || 'Failed to load clipboards'
			})
			.addCase(addClipboard.pending, state => {
				state.error = null
			})
			.addCase(
				addClipboard.fulfilled,
				(state, action: PayloadAction<AddClipboardPayload>) => {
					state.clipboards = [action.payload.clipboard, ...state.clipboards]
					state.error = null
				},
			)
			.addCase(addClipboard.rejected, (state, action) => {
				state.error = action.payload || 'Failed to add clipboard'
			})
			.addCase(editClipboard.pending, state => {
				state.error = null
			})
			.addCase(
				editClipboard.fulfilled,
				(state, action: PayloadAction<AddClipboardPayload>) => {
					state.clipboards = state.clipboards.map(clipboard => {
						if (clipboard.id === action.payload.clipboard.id) {
							return action.payload.clipboard
						}
						return clipboard
					})
					state.error = null
				},
			)
			.addCase(editClipboard.rejected, (state, action) => {
				state.error = action.payload || 'Failed to edit clipboard'
			})
			.addCase(deleteClipboards.pending, state => {
				state.error = null
			})
			.addCase(
				deleteClipboards.fulfilled,
				(state, action: PayloadAction<AddClipboardPayload>) => {
					state.clipboards = state.clipboards.filter(
						clipboard => clipboard.id !== action.payload.clipboard.id,
					)
					state.error = null
				},
			)
			.addCase(deleteClipboards.rejected, (state, action) => {
				state.error = action.payload || 'Failed to delete clipboard'
			})
	},
})

export default clipboardsSlice.reducer
