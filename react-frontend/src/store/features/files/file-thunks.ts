import { backendurl } from '@/lib/env'
import { TFile } from '@/lib/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TError } from './file-slice'

export type TFetchFilesPayload = {
	message: string
	files: TFile[] | []
}
export type TUploadFilePayload = {
	message: string
	file: TFile
}

export const fetchUploadFiles = createAsyncThunk<
	TFetchFilesPayload,
	string,
	{ rejectValue: TError }
>('files/fetchUploadFiles', async (userId, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/files/${userId}/uploads`, { method: 'GET' })
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue({
				message: errorData.message || 'Failed to fetch files',
				code: errorData.code,
			})
		}
		const data: TFetchFilesPayload = await response.json()
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred while fetching files',
		})
	}
})
export const fetchProxyFiles = createAsyncThunk<
	TFetchFilesPayload,
	string,
	{ rejectValue: TError }
>('files/fetchProxyFiles', async (userId, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/files/${userId}/proxy`, { method: 'GET' })
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue({
				message: errorData.message || 'Failed to fetch files',
				code: errorData.code,
			})
		}
		const data: TFetchFilesPayload = await response.json()
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred while fetching files',
		})
	}
})

export const uploadFile = createAsyncThunk<
	TUploadFilePayload,
	{ file: File; userId: string },
	{ rejectValue: TError }
>('files/uploadFile', async (fileData, { rejectWithValue }) => {
	try {
		const formData = new FormData()
		formData.append('file', fileData.file)

		const response = await fetch(`${backendurl}/files/${fileData.userId}/upload`, {
			method: 'POST',
			body: formData,
		})
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue({
				message: errorData.message || 'Failed to fetch files',
				code: errorData.code,
			})
		}
		const data: TUploadFilePayload = await response.json()
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred while fetching files',
		})
	}
})

export const proxyUpload = createAsyncThunk<
	TUploadFilePayload,
	{ url: string; userId: string },
	{ rejectValue: TError }
>('files/proxyupload', async (fileData, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/files/${fileData.userId}/proxy`, {
			method: 'POST',
			body: JSON.stringify({ url: fileData.url }),
		})
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue({
				message: errorData.message || 'Failed to fetch files',
				code: errorData.code,
			})
		}
		const data: TUploadFilePayload = await response.json()
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(error)
		return rejectWithValue({
			message: error.message || 'An unexpected error occurred while fetching files',
		})
	}
})
