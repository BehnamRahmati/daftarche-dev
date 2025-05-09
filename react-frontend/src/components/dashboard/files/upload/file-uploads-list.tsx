import ListLoading from '@/components/list-loading'
import {
	selectFilesAreLoading,
	selectFilesError,
	selectUploadFiles,
} from '@/store/features/files/file-selectors'
import { fetchUploadFiles } from '@/store/features/files/file-thunks'
import { selectUser } from '@/store/features/user/user-selectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect, useRef } from 'react'
import FileItem from '../file-item'

export default function FileUploadsList() {
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectUser)
	const userId = user?.id
	const files = useAppSelector(selectUploadFiles)
	const filesItems = files?.length
	const isLoading = useAppSelector(selectFilesAreLoading)
	const error = useAppSelector(selectFilesError)

	const filesListRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (userId && filesListRef.current && !filesItems) {
			dispatch(fetchUploadFiles(userId))
		}
	}, [userId, dispatch, filesItems])

	return (
		<div className='my-10 lg:w-3xl mx-auto' ref={filesListRef}>
			{isLoading && <ListLoading />}
			{error && <div className='error-message '>Error loading files: {error.message}</div>}
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
							files.map(file => <FileItem file={file} key={file.id} />)
						)}
					</div>
				</div>
			)}
		</div>
	)
}
