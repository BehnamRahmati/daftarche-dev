import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useUser from '@/hooks/use-user'
import { uploadFile } from '@/store/features/files/files-thunks'
import { useAppDispatch } from '@/store/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { DocumentUpload } from 'iconsax-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const uploadFormSchema = z.object({
	file: z.instanceof(File).refine(file => {
		return file.size <= 500 * 1024 * 1024
	}, 'File size must be less than 500MB'),
})

export default function FilesUploadForm() {
	const dispatch = useAppDispatch()
	const { user } = useUser()
	const form = useForm<z.infer<typeof uploadFormSchema>>({
		resolver: zodResolver(uploadFormSchema),
		defaultValues: {
			file: undefined,
		},
	})

	const onSubmit = (values: z.infer<typeof uploadFormSchema>) => {
		if (user) {
			dispatch(uploadFile({ file: values.file, userId: user?.id }))
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='lg:w-3xl mx-auto flex gap-2.5 mt-10'
			>
				<FormField
					control={form.control}
					name='file'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormControl>
								<Input
									type='file'
									onChange={e => {
										const file = e.target.files?.[0]
										field.onChange(file)
									}}
								/>
							</FormControl>
							<FormDescription>
								Choose a single file from your device.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button size='icon'>
					<DocumentUpload className='size-5 stroke-primary-foreground' variant='Broken' />
				</Button>
			</form>
		</Form>
	)
}
