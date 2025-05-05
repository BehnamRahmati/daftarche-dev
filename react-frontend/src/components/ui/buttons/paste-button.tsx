import { Button } from '@/components/ui/button'
import { ClipboardText, ClipboardTick } from 'iconsax-react'
import { memo, useEffect, useState } from 'react'

function PasteButton({ handlePaste }: { handlePaste: () => void }) {
	const [isPasted, setIsPasted] = useState(false)

	const handleClick = () => {
		handlePaste()
		setIsPasted(true)
	}
	useEffect(() => {
		if (isPasted) {
			const timer = setTimeout(() => {
				setIsPasted(false)
			}, 1000)
			return () => clearTimeout(timer)
		}
	}, [isPasted])
	return (
		<Button type='button' size='icon' onClick={handleClick}>
			{isPasted ? (
				<ClipboardTick className='size-5 stroke-green-200' variant='Broken' />
			) : (
				<ClipboardText className='size-5 stroke-primary-foreground' variant='Broken' />
			)}
		</Button>
	)
}

export default memo(PasteButton)
