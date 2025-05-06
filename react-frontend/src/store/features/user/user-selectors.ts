import { TUser } from '@/lib/types'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export const selectUserState = (state: RootState) => state.user

export const selectUser = createSelector([selectUserState], userState => userState.user)

export const selectUserIsLoading = createSelector(
	[selectUserState],
	userState => userState.isLoading,
)

export const selectUserError = createSelector([selectUserState], userState => userState.error)

export const selectIsAuthenticated = createSelector(
	[selectUser],
	(user: TUser | null): boolean => !!user,
)
