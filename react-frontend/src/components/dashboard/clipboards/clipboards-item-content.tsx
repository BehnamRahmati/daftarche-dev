import { useEffect, useRef, useState } from 'react'
import ClipboardsEditForm from './form/clipboards-edit-form'

function ClipboardsItemContent({ content , clipboardId }: { content: string, clipboardId: string }) {
	const [editingMode, setEditingMode] = useState(false)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const handleDoubleClick = () => {
		setEditingMode(true)
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				editingMode &&
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setEditingMode(false)
			}
		}
		if (editingMode) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [editingMode])

	return (
		<div className='w-8/12 truncate' ref={containerRef}>
			{editingMode ? (
				<ClipboardsEditForm clipboardId={clipboardId} setEditingMode={setEditingMode} content={content} />
			) : (
				<p onDoubleClick={() => handleDoubleClick()}>{content}</p>
			)}
		</div>
	)
}

export default ClipboardsItemContent
