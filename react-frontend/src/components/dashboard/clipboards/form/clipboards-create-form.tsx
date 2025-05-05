import { Button } from '@/components/ui/button'
import PasteButton from '@/components/ui/buttons/paste-button'
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
import { addClipboard } from '@/store/features/clipboards/clipboard-thunks'
import { useAppDispatch } from '@/store/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { NoteAdd } from 'iconsax-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const clipboardFormSchema = z.object({
	content: z.string().min(1, { message: 'Content is required' }),
})

export default function ClipboardsCreateForm() {
	const { user } = useUser()
	const dispatch = useAppDispatch()
	const form = useForm<z.infer<typeof clipboardFormSchema>>({
		resolver: zodResolver(clipboardFormSchema),
		defaultValues: {
			content: '',
		},
	})

	const handlePaste = useCallback(() => {
		navigator.clipboard.readText().then(text => {
			form.setValue('content', text)
		})
	}, [form])

	const onSubmit = async (values: z.infer<typeof clipboardFormSchema>) => {
		await dispatch(addClipboard({ userId: user?.id ?? '', ...values }))
		form.reset()
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex gap-2.5 mt-10 lg:w-3xl mx-auto'
			>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormControl>
								<Input {...field} placeholder='clipboard' />
							</FormControl>
							<FormDescription>paste your clipboard here.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<PasteButton handlePaste={handlePaste} />
				<Button type='submit' size='icon'>
					<NoteAdd className='size-5 stroke-primary-foreground' variant='Broken' />
				</Button>
			</form>
		</Form>
	)
}
