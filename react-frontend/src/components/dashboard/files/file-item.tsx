import { Button } from '@/components/ui/button'
import { backendurl } from '@/lib/env'
import { TFile } from '@/lib/types'
import { formatFileSize } from '@/lib/utils'
import { DocumentDownload, Trash } from 'iconsax-react'
import moment from 'moment'
import { Link } from 'react-router'

export default function FileItem({ file }: { file: TFile }) {
	return (
		<div className='flex items-center py-1 px-2.5 even:bg-accent rounded-sm shadow-sm text-sm'>
			<div className='w-5/12'>{file.filename}</div>
			<div className='w-2/12'>{formatFileSize(file.size)}</div>
			<div className='w-2/12'>{file.status}</div>
			<div className='w-2/12'>{moment(file.createdAt).fromNow()}</div>
			<div className='w-1/12 flex items-center'>
				<Button variant='ghost' size='icon' aria-label='download' title='download'>
					<Link to={backendurl + file.url} download target='_blank'>
						<DocumentDownload className='size-5 stroke-foreground' variant='Broken' />
					</Link>
				</Button>
				<Button variant='ghost' size='icon'>
					<Trash className='size-5 stroke-red-500' variant='Broken' />
				</Button>
			</div>
		</div>
	)
}
