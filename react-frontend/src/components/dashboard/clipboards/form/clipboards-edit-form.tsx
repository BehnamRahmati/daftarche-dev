import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { editClipboard } from '@/store/features/clipboards/clipboard-thunks'
import { useAppDispatch } from '@/store/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const clipboardFormSchema = z.object({
	content: z.string().min(1, { message: 'Content is required' }),
})

function ClipboardsEditForm({
	content,
	setEditingMode,
	clipboardId,
}: {
	content: string
	setEditingMode: React.Dispatch<React.SetStateAction<boolean>>;
	clipboardId: string
}) {
	const dispatch = useAppDispatch()
	const form = useForm<z.infer<typeof clipboardFormSchema>>({
		resolver: zodResolver(clipboardFormSchema),
		defaultValues: {
			content,
		},
	})

	const onSubmit = async (values: z.infer<typeof clipboardFormSchema>) => {
		await dispatch(editClipboard({clipboardId , ...values}))
		setEditingMode(false)
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-2.5 p-1 w-full'>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormControl>
								<Input {...field} placeholder='clipboard' />
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}

export default memo(ClipboardsEditForm)
