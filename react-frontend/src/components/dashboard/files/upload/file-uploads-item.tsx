import { TFile } from '@/lib/types'
import { formatFileSize } from '@/lib/utils'
import moment from 'moment'

export default function FileUploadsItem({ file }: { file: TFile }) {
	return (
		<div className='flex items-center p-2.5 even:bg-accent rounded-sm shadow-sm text-sm'>
			<div className='w-5/12'>{file.filename}</div>
			<div className='w-2/12'>{formatFileSize(file.size)}</div>
			<div className='w-2/12'>{file.status}</div>
			<div className='w-2/12'>{moment(file.createdAt).fromNow()}</div>
			<div className='w-1/12'>actions</div>
		</div>
	)
}
