import { SidebarTrigger } from '../ui/sidebar'

export default function DashboardHeader() {
	return (
		<div className='bg-sidebar p-2.5 w-full border-b border-b-sidebar-border'>
			<SidebarTrigger />
		</div>
	)
}
