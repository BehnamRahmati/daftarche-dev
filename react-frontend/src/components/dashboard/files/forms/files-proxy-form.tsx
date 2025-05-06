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
import { proxyUpload } from '@/store/features/files/file-thunks'
import { useAppDispatch } from '@/store/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { GlobalEdit } from 'iconsax-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const uploadFormSchema = z.object({
	url: z.string().min(1, { message: 'Url is required' }),
})

export default function FilesProxyForm() {
	const dispatch = useAppDispatch()
	const { user } = useUser()
	const form = useForm<z.infer<typeof uploadFormSchema>>({
		resolver: zodResolver(uploadFormSchema),
		defaultValues: {
			url: '',
		},
	})

	const onSubmit = (values: z.infer<typeof uploadFormSchema>) => {
		if (user) {
			dispatch(proxyUpload({ url: values.url, userId: user?.id }))
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
					name='url'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormControl>
								<Input {...field} placeholder='https://example.com/xyz?download' />
							</FormControl>
							<FormDescription>Paste a File download Link .</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button size='icon'>
					<GlobalEdit className='size-5 stroke-primary-foreground' variant='Broken' />
				</Button>
			</form>
		</Form>
	)
}
