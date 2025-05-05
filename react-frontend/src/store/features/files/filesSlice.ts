import { TFile } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	fetchFiles,
	proxyUpload,
	TFetchFilesPayload,
	TUploadFilePayload,
	uploadFile,
} from './files-thunks'

type TFileState = {
	files: TFile[] | []
	isLoading: boolean
	error: string
}

const initialState: TFileState = {
	files: [],
	isLoading: false,
	error: '',
}

export const filesSlice = createSlice({
	name: 'files',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchFiles.pending, state => {
				state.isLoading = true
				state.error = ''
			})
			.addCase(fetchFiles.fulfilled, (state, action: PayloadAction<TFetchFilesPayload>) => {
				state.isLoading = false
				state.files = action.payload.files
			})
			.addCase(fetchFiles.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload || 'Failed to load files'
			})
			.addCase(uploadFile.pending, state => {
				state.error = ''
			})
			.addCase(uploadFile.fulfilled, (state, action: PayloadAction<TUploadFilePayload>) => {
				state.files = [action.payload.files, ...state.files]
			})
			.addCase(uploadFile.rejected, (state, action) => {
				state.error = action.payload || 'Failed to load files'
			})
			.addCase(proxyUpload.pending, state => {
				state.error = ''
			})
			.addCase(proxyUpload.fulfilled, (state, action: PayloadAction<TUploadFilePayload>) => {
				state.files = [action.payload.files, ...state.files]
			})
			.addCase(proxyUpload.rejected, (state, action) => {
				state.error = action.payload || 'Failed to load files'
			})
	},
})

export default filesSlice.reducer
