import { backendurl } from '@/lib/env'
import { TClipboard } from '@/lib/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TError } from './clipboard-slice'

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
	{ rejectValue: TError }
>('clipboards/fetchClipboards', async (userId, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/clipboards/${userId}`, { method: 'GET' })
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue({
				message: errorData.message || 'Failed to fetch clipboards',
				code: errorData.code,
			})
		}
		const data: FetchClipboardsPayload = await response.json()
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred while fetching clipboards',
		})
	}
})

export const addClipboard = createAsyncThunk<
	AddClipboardPayload,
	{ content: string; userId: string },
	{ rejectValue: TError }
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
			return rejectWithValue({
				message: errorData.message || 'Failed to add clipboard',
				code: errorData.code,
			})
		}
		const data: AddClipboardPayload = await response.json()
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred while adding clipboard',
		})
	}
})
export const editClipboard = createAsyncThunk<
	AddClipboardPayload,
	{ content: string; clipboardId: string },
	{ rejectValue: TError }
>('clipboards/editClipboards', async (clipboardData, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/clipboards`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(clipboardData),
		})
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue({
				message: errorData.message || 'Failed to add clipboard',
				code: errorData.code,
			})
		}
		const data: AddClipboardPayload = await response.json()
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred while adding clipboard',
		})
	}
})

export const deleteClipboards = createAsyncThunk<
	AddClipboardPayload,
	{ clipboardId: string },
	{ rejectValue: TError }
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
			return rejectWithValue({
				message: errorData.message || 'Failed to add clipboard',
				code: errorData.code,
			})
		}
		const data: AddClipboardPayload = await response.json()
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred while adding clipboard',
		})
	}
})
