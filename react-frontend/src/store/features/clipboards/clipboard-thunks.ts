import { backendurl } from '@/lib/env'
import { TClipboard } from '@/lib/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export type FetchClipboardsPayload = {
	message: string
	clipboards: TClipboard[]
}

export type AddClipboardPayload = {
	message: string
	clipboard: TClipboard
}

export const fetchClipboards = createAsyncThunk<
	FetchClipboardsPayload,
	string,
	{ rejectValue: string }
>('clipboards/fetchClipboards', async (userId, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/clipboards/${userId}`, { method: 'GET' })
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue(errorData.message || 'Failed to fetch clipboards')
		}
		const data: FetchClipboardsPayload = await response.json()
		return data
	} catch (error) {
		console.log(error)
		return rejectWithValue('An unexpected error occurred while fetching clipboards')
	}
})

export const addClipboard = createAsyncThunk<
	AddClipboardPayload, // Updated payload type
	{ content: string; userId: string },
	{ rejectValue: string }
>('clipboards/addClipboard', async (clipboardData, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/clipboards/${clipboardData.userId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ content: clipboardData.content }),
		})
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue(errorData.message || 'Failed to add clipboard')
		}
		const data: AddClipboardPayload = await response.json()
		return data
	} catch (error) {
		// Handle network errors or other exceptions
		console.log(error)
		return rejectWithValue('An unexpected error occurred while adding clipboard') // Updated error message
	}
})
export const editClipboard = createAsyncThunk<
	AddClipboardPayload, // Updated payload type
	{ content: string; clipboardId: string },
	{ rejectValue: string }
>('clipboards/editClipboards', async (clipboardData, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/clipboards`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(clipboardData), // Use the passed data
		})
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue(errorData.message || 'Failed to add clipboard') // Updated error message
		}
		const data: AddClipboardPayload = await response.json() // Use updated payload type
		return data
	} catch (error) {
		// Handle network errors or other exceptions
		console.log(error)
		return rejectWithValue('An unexpected error occurred while adding clipboard') // Updated error message
	}
})

export const deleteClipboards = createAsyncThunk<
	AddClipboardPayload,
	{ clipboardId: string },
	{ rejectValue: string }
>('clipboards/deleteClipboards', async (clipboardData, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/clipboards/${clipboardData.clipboardId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue(errorData.message || 'Failed to add clipboard') // Updated error message
		}
		const data: AddClipboardPayload = await response.json() // Use updated payload type
		return data
	} catch (error) {
		// Handle network errors or other exceptions
		console.log(error)
		return rejectWithValue('An unexpected error occurred while adding clipboard') // Updated error message
	}
})
