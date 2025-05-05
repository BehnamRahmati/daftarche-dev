import { Button } from '@/components/ui/button'
import { Copy, CopySuccess } from 'iconsax-react'
import { memo, useEffect, useState } from 'react'

function CopyButton({ handleCopy }: { handleCopy: () => void }) {
	const [isCopied, setIsCopied] = useState(false)

	const handleClick = () => {
		handleCopy()
		setIsCopied(true)
	}
	useEffect(() => {
		if (isCopied) {
			const timer = setTimeout(() => {
				setIsCopied(false)
			}, 1000)
			return () => clearTimeout(timer)
		}
	}, [isCopied])
	return (
		<Button type='button' variant='ghost' size='sm' onClick={handleClick}>
			{isCopied ? (
				<CopySuccess className='size-5 stroke-green-500' variant='Broken' />
			) : (
				<Copy
					className='size-5 stroke-muted-foreground group-hover:stroke-foreground'
					variant='Broken'
				/>
			)}
		</Button>
	)
}

export default memo(CopyButton)
