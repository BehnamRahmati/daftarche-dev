import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { login } from '@/store/features/user/user-thunks'
import { useAppDispatch } from '@/store/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Back } from 'iconsax-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

const clipboardFormSchema = z.object({
	email: z.string().email().min(1, { message: 'Content is required' }),
	password: z.string().min(1, { message: 'Content is required' }),
})

export default function LoginForm() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const form = useForm<z.infer<typeof clipboardFormSchema>>({
		resolver: zodResolver(clipboardFormSchema),
		defaultValues: {
			email: 'demo@demo.com',
			password: 'demodemo',
		},
	})

	const onSubmit = async (values: z.infer<typeof clipboardFormSchema>) => {
		await dispatch(login(values))
		navigate('/dashboard')
	}
	return (
		<div className='lg:w-md bg-card p-10 rounded-md shadow-sm relative'>
			<div className='absolute top-3 left-3'>
				<Button variant='ghost' className='' onClick={() => navigate('/')}>
					<Back className='size-5 stroke-muted-foreground' variant='Broken' />
					<span className='text-muted-foreground'>home</span>
				</Button>
			</div>
			<div className='mb-10 mt-5'>
				<h2 className='text-center text-muted-foreground'>
					welcome back to
					<span className='text-3xl text-accent-foreground font-bold inline-block ml-1'>
						Daftarche
					</span>
					<span className='text-primary text-6xl'>.</span>
				</h2>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-5  w-full'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>email :</FormLabel>
								<FormControl>
									<Input {...field} type='email' placeholder='john@doe.com' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>password :</FormLabel>
								<FormControl>
									<Input {...field} type='password' placeholder='...' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' variant='default' disabled={form.formState.isSubmitting}>
						login
					</Button>
				</form>
			</Form>

			<div className=''>
				<Button
					variant='link'
					className='w-full mt-5'
					onClick={() => navigate('/auth/register')}
				>
					dont have an account?
				</Button>
			</div>
		</div>
	)
}
