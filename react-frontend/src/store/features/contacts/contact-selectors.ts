import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../store'

export const selectContactsState = (state: RootState) => state.contacts

export const selectContacts = createSelector(
	[selectContactsState],
	contactState => contactState.contacts,
)

export const selectContactsAreLoading = createSelector(
	[selectContactsState],
	contactState => contactState.isLoading,
)

export const selectContactsError = createSelector(
	[selectContactsState],
	contactState => contactState.error,
)
