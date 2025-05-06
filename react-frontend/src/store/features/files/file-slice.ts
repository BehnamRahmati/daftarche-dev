import { TFile } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	fetchProxyFiles,
	fetchUploadFiles,
	proxyUpload,
	TFetchFilesPayload,
	TUploadFilePayload,
	uploadFile,
} from './file-thunks'

export type TError = {
	message: string
	code?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	details?: any
} | null

type TFileState = {
	files: TFile[] | []
	isLoading: boolean
	error: TError
}

const initialState: TFileState = {
	files: [],
	isLoading: false,
	error: null,
}

export const filesSlice = createSlice({
	name: 'files',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchUploadFiles.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(
				fetchUploadFiles.fulfilled,
				(state, action: PayloadAction<TFetchFilesPayload>) => {
					state.isLoading = false
					state.files = action.payload.files
				},
			)
			.addCase(fetchUploadFiles.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || { message: 'Failed to load files' }
			})
			.addCase(fetchProxyFiles.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(
				fetchProxyFiles.fulfilled,
				(state, action: PayloadAction<TFetchFilesPayload>) => {
					state.isLoading = false
					state.files = action.payload.files
				},
			)
			.addCase(fetchProxyFiles.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || { message: 'Failed to load files' }
			})
			.addCase(uploadFile.pending, state => {
				state.error = null
			})
			.addCase(uploadFile.fulfilled, (state, action: PayloadAction<TUploadFilePayload>) => {
				state.files = [action.payload.file, ...state.files]
			})
			.addCase(uploadFile.rejected, (state, action) => {
				state.error = action.payload || { message: 'Failed to load files' }
			})
			.addCase(proxyUpload.pending, state => {
				state.error = null
			})
			.addCase(proxyUpload.fulfilled, (state, action: PayloadAction<TUploadFilePayload>) => {
				state.files = [action.payload.file, ...state.files]
			})
			.addCase(proxyUpload.rejected, (state, action) => {
				state.error = action.payload || { message: 'Failed to load files' }
			})
	},
})

export default filesSlice.reducer
