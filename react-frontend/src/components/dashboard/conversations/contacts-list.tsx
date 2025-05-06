import { Call, Message } from 'iconsax-react'

export default function Contactslist() {
	return (
		<div>
			<div className='flex flex-col'>
				{Array.from({ length: 10 }).map((_, i) => (
					<div key={i} className='flex items-center gap-2.5 p-2.5'>
						<div className='shrink-0 bg-gray-300 size-10 rounded-full'></div>
						<div className=''>
							<div className='font-light '>Behnam Rahmati</div>
							<div className='font-light text-xs text-muted-foreground truncate'>
								this is a sample bio
							</div>
						</div>
						<div className='mr-0 ml-auto flex items-center gap-1'>
							<Call className='size-5 stroke-foreground' values='Broken' />
							<Message className='size-5 stroke-foreground' values='Broken' />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
