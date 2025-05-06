import { LoaderCircle } from 'lucide-react'

export default function Loading() {
	return (
		<div>
			<div className='fixed inset-0 backdrop-blur-md grid place-content-center'>
				<div className='animate-spin'>
					<LoaderCircle className='stroke-primary size-14' />
				</div>
			</div>
		</div>
	)
}
