import FilesProxyForm from '@/components/dashboard/files/forms/files-proxy-form'
import FileProxyList from '@/components/dashboard/files/proxy/file-proxy-list'

export default function Proxy() {
	return (
		<div className='mt-10'>
			<h1 className='text-2xl font-semibold mb-2.5 text-center'>Proxy Uploads</h1>
			<p className='text-lg text-muted-foreground max-w-1/2 mb-2.5 mx-auto text-center'>
				An app for recieving your files url on the web and making them accessible from all
				of your devices.
			</p>
			<FilesProxyForm />
			<FileProxyList />
		</div>
	)
}
