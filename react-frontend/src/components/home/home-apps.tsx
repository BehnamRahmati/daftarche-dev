import { ClipboardText, DeviceMessage, DocumentCloud } from 'iconsax-react'

const apps = [
	{
		name: 'Clipboards App',
		description: 'An app for storing your clipboards on cloud',
		icon: <ClipboardText className='size-24 stroke-accent-foreground' variant='Broken' />,
	},
	{
		name: 'Conversations App',
		description: 'An app for messaging your friends',
		icon: <DeviceMessage className='size-24 stroke-accent-foreground' variant='Broken' />,
	},
	{
		name: 'Files App',
		description: 'An app for storing your files on cloud or downloading via proxy',
		icon: <DocumentCloud className='size-24 stroke-accent-foreground' variant='Broken' />,
	},
]

export default function HomeApps() {
	return (
		<div className='py-10 lg:py-20'>
			<div className='flex flex-col lg:flex-row items-stretch justify-center gap-10'>
				{apps.map((app, index) => {
					return (
						<div
							key={index}
							className='bg-accent rounded-md shadow-sm px-5 py-10 flex flex-col items-center gap-5'
						>
							{app.icon}
							<h2 className='text-2xl font-semibold text-accent-foreground'>
								{app.name}
							</h2>
							<p className='lg:w-56 text-center text-muted-foreground'>
								{app.description}
							</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}
