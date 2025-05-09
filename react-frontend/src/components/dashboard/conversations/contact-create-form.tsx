import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addContact } from '@/store/features/contacts/contact-thunks'
import { selectUser } from '@/store/features/user/user-selectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	contactEmail: z.string().min(1),
})

export default function ContactsCreateForm() {
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectUser)
	const userId = user?.id
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { contactEmail: '' },
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (userId) dispatch(addContact({ contactEmail: values.contactEmail, userId }))
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
				<FormField
					control={form.control}
					name='contactEmail'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormControl>
								<Input {...field} placeholder='search contact email' type='email' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
