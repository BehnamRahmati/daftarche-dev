import useUser from '@/hooks/use-user'
import { logout } from '@/store/features/user/user-thunks'
import { useAppDispatch } from '@/store/hooks'
import { Login } from 'iconsax-react'
import { Link } from 'react-router'
import { Button } from '../ui/button'

export default function HomeHeader() {
	const { user } = useUser()
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		dispatch(logout())
		window.location.reload()
	}

	const renderButtons = () => {
		if (user) {
			return (
				<div className='flex items-center *:leading-5'>
					<Button variant='link' className='text-primary'>
						<Link to='dashboard' className='text-primary '>
							Dashboard
						</Link>
					</Button>

					<div className='inline-block text-primary px-0!'>|</div>
					<Button variant='link' onClick={handleLogout} className='text-primary'>
						Logout
					</Button>
				</div>
			)
		}

		return (
			<div className='flex items-center *:p-2.5 *:leading-5 *:text-primary bg-primary/20 rounded-md *:text-sm'>
				<Link
					to='auth/login'
					className='flex items-center gap-2.5 hover:bg-primary/20 rounded-l-md'
				>
					<Login className='size-5 stroke-primary inline-block' variant='Broken' />
					<span>login</span>
				</Link>
				<div className='inline-block text-primary px-0!'>|</div>
				<Link to='auth/register' className='rounded-r-md hover:bg-primary/20'>
					register
				</Link>
			</div>
		)
	}
	return (
		<header>
			<div className='border-b border-b-sidebar-border'>
				<div className='container mx-auto p-2.5 lg:p-5'>
					<div className='flex items-center justify-between'>
						<div className='text-primary font-bold text-2xl'>Daftarche</div>
						{renderButtons()}
					</div>
				</div>
			</div>
		</header>
	)
}
