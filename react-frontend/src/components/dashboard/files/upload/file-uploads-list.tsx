import { Skeleton } from '@/components/ui/skeleton'
import useUser from '@/hooks/use-user'
import { fetchFiles } from '@/store/features/files/files-thunks'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store/store'
import { useEffect } from 'react'
import FileUploadsItem from './file-uploads-item'

export default function FileUploadsList() {
	const dispatch = useAppDispatch()
	const { user } = useUser()
	const { files, error, isLoading } = useAppSelector((state: RootState) => state.files)

	useEffect(() => {
		if (user) {
			dispatch(fetchFiles(user.id))
		}
	}, [user, dispatch])

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
			{error && <div className='error-message '>Error loading files: {error}</div>}
			{files && !isLoading && !error && (
				<div>
					<div className='bg-accent p-2.5 mt-2.5 flex items-center gap-2.5 rounded-md shadow-sm *:font-semibold'>
						<div className='w-5/12'>filename</div>
						<div className='w-2/12'>size</div>
						<div className='w-2/12'>status</div>
						<div className='w-2/12'>date</div>
						<div className='w-1/12'>actions</div>
					</div>
					<div className='flex flex-col gap-2.5 mt-2.5'>
						{files.length === 0 ? (
							<div className='empty-message mt-5'>No clipboards found</div>
						) : (
							files.map(file => <FileUploadsItem file={file} key={file.id} />)
						)}
					</div>
				</div>
			)}
		</div>
	)
}
