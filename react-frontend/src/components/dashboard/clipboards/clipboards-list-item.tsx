import { TClipboard } from '@/lib/types'
import { deleteClipboards } from '@/store/features/clipboards/clipboard-thunks'
import { useAppDispatch } from '@/store/hooks'
import moment from 'moment'
import { memo, useCallback } from 'react'
import ClipboardsCopyButton from './buttons/clipboards-copy-button'
import ClipboardsDeleteButton from './buttons/clipboards-delete-button'
import ClipboardsItemContent from './clipboards-item-content'

function ClipboardsListItem({ clipboard }: { clipboard: TClipboard }) {
	const dispatch = useAppDispatch()

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(clipboard.content)
	}, [clipboard])

	const handleDelete = useCallback(async () => {
		await dispatch(deleteClipboards({ clipboardId: clipboard.id }))
	}, [clipboard, dispatch])

	return (
		<div className='even:bg-accent p-2.5 mt-2.5 flex items-center gap-2.5 rounded-md shadow-sm group *:text-muted-foreground hover:*:text-foreground text-sm'>
			<ClipboardsItemContent clipboardId={clipboard.id} content={clipboard.content} />
			<div className='w-2/12'>{moment(clipboard.createdAt).fromNow()}</div>
			<div className='w-2/12'>
				<ClipboardsCopyButton handleCopy={handleCopy} />
				<ClipboardsDeleteButton handleDelete={handleDelete} />
			</div>
		</div>
	)
}

export default memo(ClipboardsListItem)
