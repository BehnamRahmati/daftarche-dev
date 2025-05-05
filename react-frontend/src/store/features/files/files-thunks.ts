import { backendurl } from '@/lib/env'
import { TFile } from '@/lib/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export type TFetchFilesPayload = {
	message: string
	files: TFile[] | []
}
export type TUploadFilePayload = {
	message: string
	files: TFile
}

export const fetchFiles = createAsyncThunk<TFetchFilesPayload, string, { rejectValue: string }>(
	'files/fetchFiles',
	async (userId, { rejectWithValue }) => {
		try {
			const response = await fetch(`${backendurl}/files/${userId}`, { method: 'GET' })
			if (!response.ok) {
				const errorData = await response.json()
				return rejectWithValue(errorData.message || 'Failed to fetch clipboards')
			}
			const data: TFetchFilesPayload = await response.json()
			return data
		} catch (error) {
			console.log(error)
			return rejectWithValue('An unexpected error occurred while fetching clipboards')
		}
	},
)

export const uploadFile = createAsyncThunk<
	TUploadFilePayload,
	{ file: File; userId: string },
	{ rejectValue: string }
>('files/uploadFile', async (fileData, { rejectWithValue }) => {
	try {
		const formData = new FormData()
		formData.append('file', fileData.file)

		const response = await fetch(`${backendurl}/files/${fileData.userId}`, {
			method: 'POST',
			body: formData,
		})
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue(errorData.message || 'Failed to fetch clipboards')
		}
		const data: TUploadFilePayload = await response.json()
		return data
	} catch (error) {
		console.log(error)
		return rejectWithValue('An unexpected error occurred while fetching clipboards')
	}
})

export const proxyUpload = createAsyncThunk<
	TUploadFilePayload,
	{ url: string; userId: string },
	{ rejectValue: string }
>('files/proxyupload', async (fileData, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendurl}/files/${fileData.userId}/proxy`, {
			method: 'POST',
			body: JSON.stringify({ url: fileData.url }),
		})
		if (!response.ok) {
			const errorData = await response.json()
			return rejectWithValue(errorData.message || 'Failed to fetch clipboards')
		}
		const data: TUploadFilePayload = await response.json()
		return data
	} catch (error) {
		console.log(error)
		return rejectWithValue('An unexpected error occurred while fetching clipboards')
	}
})
