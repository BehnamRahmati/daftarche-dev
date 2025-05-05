import FilesUploadForm from '@/components/dashboard/files/forms/files-upload-form'
import FileUploadsList from '@/components/dashboard/files/upload/file-uploads-list'

export default function Upload() {
	return (
		<div>
			<div className='mt-10'>
				<h1 className='text-2xl font-semibold mb-2.5 text-center'>Uploads</h1>
				<p className='text-lg text-muted-foreground max-w-1/2 mb-2.5 mx-auto text-center'>
					An app for uploading your files on the web and making them accessible from all
					of your devices.
				</p>
			</div>
			<FilesUploadForm />
			<FileUploadsList />
		</div>
	)
}
