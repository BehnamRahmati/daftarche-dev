import ListLoading from '@/components/list-loading'
import {
	selectClipboards,
	selectClipboardsAreLoading,
	selectClipboardsError,
} from '@/store/features/clipboards/clipboard-selectors'
import { fetchClipboards } from '@/store/features/clipboards/clipboard-thunks'
import { selectUser } from '@/store/features/user/user-selectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect, useRef } from 'react'
import ClipboardsListItem from './clipboards-list-item'

export default function ClipboardsList() {
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectUser)
	const userId = user?.id
	const clipboards = useAppSelector(selectClipboards)
	const clipbordsItems = clipboards?.length
	const isLoading = useAppSelector(selectClipboardsAreLoading)
	const error = useAppSelector(selectClipboardsError)

	const clipbordsListRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (clipbordsListRef.current && userId && !clipbordsItems) {
			console.warn('fetching clipboards')
			dispatch(fetchClipboards(userId))
		}
	}, [dispatch, userId, clipbordsItems])

	return (
		<div className='my-10 lg:w-3xl mx-auto' ref={clipbordsListRef}>
			{isLoading && <ListLoading />}
			{error && (
				<div className='error-message '>Error loading clipboards: {error.message}</div>
			)}
			{clipboards && !isLoading && !error && (
				<div>
					<div className='bg-accent p-2.5 mt-2.5 flex items-center gap-2.5 rounded-md shadow-sm *:font-semibold'>
						<div className='w-8/12'>content</div>
						<div className='w-2/12'>date</div>
						<div className='w-2/12'>actions</div>
					</div>
					{clipboards.length === 0 ? (
						<div className='empty-message mt-5'>No clipboards found</div>
					) : (
						clipboards.map(clipboard => (
							<ClipboardsListItem clipboard={clipboard} key={clipboard.id} />
						))
					)}
				</div>
			)}
		</div>
	)
}
