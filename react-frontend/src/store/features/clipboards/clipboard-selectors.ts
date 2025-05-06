import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../store'

export const selectClipboardState = (state: RootState) => state.clipboards

export const selectClipboards = createSelector(
	[selectClipboardState],
	clipboardState => clipboardState.clipboards,
)

export const selectClipboardsAreLoading = createSelector(
	[selectClipboardState],
	clipboardState => clipboardState.isLoading,
)

export const selectClipboardsError = createSelector(
	[selectClipboardState],
	clipboardState => clipboardState.error,
)
