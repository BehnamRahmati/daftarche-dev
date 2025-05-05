import { Skeleton } from '@/components/ui/skeleton'
import useUser from '@/hooks/use-user'
import { fetchClipboards } from '@/store/features/clipboards/clipboard-thunks'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store/store'
import { useEffect } from 'react'
import ClipboardsListItem from './clipboards-list-item'

export default function ClipboardsList() {
	const dispatch = useAppDispatch()
	const { user } = useUser()
	const { clipboards, isLoading, error } = useAppSelector((state: RootState) => state.clipboards)

	useEffect(() => {
		if (user) {
			dispatch(fetchClipboards(user?.id))
		}
	}, [dispatch, user])

	const renderLoading = () => {
		return (
			<div className='flex flex-col gap-2.5'>
				<Skeleton className='w-full h-10' />
				<Skeleton className='w-full h-10' />
				<Skeleton className='w-full h-10' />
			</div>
		)
	}

	return (
		<div className='my-10 lg:w-3xl mx-auto'>
			{isLoading && renderLoading()}
			{error && <div className='error-message '>Error loading clipboards: {error}</div>}
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
