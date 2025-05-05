import { Button } from '@/components/ui/button'
import { Trash } from 'iconsax-react'

export default function DeleteButton({ handleDelete }: { handleDelete: () => void }) {
	return (
		<Button type='button' variant='ghost' size='sm' onClick={handleDelete}>
			<Trash className='size-5 stroke-red-500' variant='Broken' />
		</Button>
	)
}
