import { Link } from 'react-router'
import { Button } from '../ui/button'

export default function HomeBanner() {
	return (
		<div className='h-[calc(100vh-80px)]'>
			<div className='h-full container mx-auto flex flex-col lg:flex-row items-center justify-center p-2.5 lg:p-5'>
				<div className='w-1/2 flex flex-col items-center gap-10'>
					<h2 className='text-5xl font-bold'>Daftarche</h2>
					<div className='*:text-lg'>
						<p>A superapp for storing your clipboards and files on Cloud</p>
						<p>Chat with your friends and share your files without any hassle.</p>
					</div>

					<Button size='lg'>
						<Link to='dashboard'>Getting Started</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
