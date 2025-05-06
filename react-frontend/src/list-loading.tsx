import { Skeleton } from './components/ui/skeleton'

export default function ListLoading() {
	return (
		<div className='flex flex-col gap-2.5'>
			<Skeleton className='w-full h-10' />
			<Skeleton className='w-full h-10' />
			<Skeleton className='w-full h-10' />
		</div>
	)
}
