import DashboardHeader from '@/components/dashboard/dashboard-header'
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { selectIsAuthenticated, selectUserIsLoading } from '@/store/features/user/user-selectors'
import { useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
export default function DashboardLayout() {
	const isLoading = useAppSelector(selectUserIsLoading)
	const isAuthenticated = useAppSelector(selectIsAuthenticated)

	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/auth/login')
		}
	}, [isAuthenticated, navigate])

	if (isLoading) return <div>Loading...</div>

	if (!isAuthenticated) return null

	return (
		<SidebarProvider>
			<DashboardSidebar />
			<main className='w-full'>
				<DashboardHeader />
				<div className='p-2.5 h-[calc(100%-50px)]'>
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	)
}
