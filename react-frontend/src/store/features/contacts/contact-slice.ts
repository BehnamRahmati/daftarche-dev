import { TContact } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	addContact,
	fetchContacts,
	TAddContactPayload,
	TFetchContactsPayload,
} from './contact-thunks'

export type TError = {
	message: string
	code?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	details?: any
} | null

type TState = {
	contacts: TContact[] | []
	isLoading: boolean
	error: TError
}

const initialState: TState = {
	contacts: [],
	isLoading: false,
	error: null,
}

export const contactSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchContacts.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(
				fetchContacts.fulfilled,
				(state, action: PayloadAction<TFetchContactsPayload>) => {
					state.isLoading = false
					state.contacts = action.payload.contacts
				},
			)
			.addCase(fetchContacts.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || {
					message: 'An unexpected error occurred while fetching contacts',
				}
			})
			.addCase(addContact.pending, state => {
				state.error = null
			})
			.addCase(addContact.fulfilled, (state, action: PayloadAction<TAddContactPayload>) => {
				state.contacts = [action.payload.contact, ...state.contacts]
				state.error = null
			})
			.addCase(addContact.rejected, (state, action) => {
				state.error = action.payload || { message: 'Failed to add contact' }
			})
	},
})

export default contactSlice.reducer
