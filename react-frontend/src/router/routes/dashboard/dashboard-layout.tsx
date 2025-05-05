import DashboardHeader from '@/components/dashboard/dashboard-header'
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'

export default function DashboardLayout() {
	const { user } = useAppSelector((state: RootState) => state.user)
	const [isLoggedin, setIsLoggedin] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/auth/login')
		} else {
			setIsLoggedin(true)
		}
	}, [user, navigate])

	if (!isLoggedin) return null

	return (
		<SidebarProvider>
			<DashboardSidebar />
			<main className='w-full'>
				<DashboardHeader />
				<div className='p-2.5'>
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	)
}
