import { RootState } from '@/store/store'
import { createSelector } from '@reduxjs/toolkit'

export const selectFilesState = (state: RootState) => state.files

export const selectUploadFiles = createSelector(selectFilesState, filesState =>
	filesState.files.filter(file => file.type === 'DIRECT'),
)
export const selectProxyFiles = createSelector(selectFilesState, filesState =>
	filesState.files.filter(file => file.type === 'PROXY'),
)

export const selectFilesAreLoading = createSelector(
	selectFilesState,
	filesState => filesState.isLoading,
)

export const selectFilesError = createSelector(selectFilesState, filesState => filesState.error)
