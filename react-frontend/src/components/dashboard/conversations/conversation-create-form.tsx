import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	contactId: z.string().min(1),
})

export default function ConversationCreateForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { contactId: '' },
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.warn(values)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Start new conversation</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
						<FormField
							control={form.control}
							name='contactId'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormControl>
										<Input {...field} placeholder='clipboard' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit'>start</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
