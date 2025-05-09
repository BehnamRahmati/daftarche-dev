import { backendurl } from '@/lib/env'
import { TContact } from '@/lib/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TError } from './contact-slice'

export type TFetchContactsPayload = {
	message: string
	contacts: TContact[]
}
export type TAddContactPayload = {
	message: string
	contact: TContact
}

export const fetchContacts = createAsyncThunk<
	TFetchContactsPayload,
	string,
	{ rejectValue: TError }
>('contacts/fetchContacts', async (userId, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/conversations/${userId}/contacts`, {
			method: 'GET',
		})
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue({
				message: errorData.message || 'Failed to fetch contacts',
				code: errorData.code,
			})
		}
		const data: TFetchContactsPayload = await response.json()
		return data

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred while fetching contacts',
		})
	}
})

export const addContact = createAsyncThunk<
	TAddContactPayload,
	{ contactEmail: string; userId: string },
	{ rejectValue: TError }
>('contacts/addContact', async (clipboardData, { rejectWithValue }) => {
	try {
		const response = await fetch(
			`${backendurl}/conversations/${clipboardData.userId}/add-contact`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					contactEmail: clipboardData.contactEmail,
				}),
			},
		)
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue({
				message: errorData.message || 'Failed to add contact',
				code: errorData.code,
			})
		}
		const data: TAddContactPayload = await response.json()
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred while adding contact',
		})
	}
})
