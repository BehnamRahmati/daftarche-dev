import ClipboardsList from '@/components/dashboard/clipboards/clipboards-list'
import ClipboardsCreateForm from '@/components/dashboard/clipboards/form/clipboards-create-form'

export default function Clipboards() {
	return (
		<>
			<div className='mt-10'>
				<h1 className='text-2xl font-semibold mb-2.5 text-center'>Clipboards</h1>
				<p className='text-lg text-muted-foreground max-w-1/2 mb-2.5 mx-auto text-center'>
					An app for storing your clipboards on the web and making them accessible from
					all of your devices.
				</p>
			</div>

			<ClipboardsCreateForm />
			<ClipboardsList />
		</>
	)
}
