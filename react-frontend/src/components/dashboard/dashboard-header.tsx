import { memo } from 'react'
import { SidebarTrigger } from '../ui/sidebar'

function DashboardHeader() {
	return (
		<div className='bg-sidebar p-2.5 w-full border-b border-b-sidebar-border'>
			<SidebarTrigger />
		</div>
	)
}

export default memo(DashboardHeader)
