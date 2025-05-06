import { memo } from 'react'
import { Link, NavLink } from 'react-router'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
} from '../ui/sidebar'

const links = [
	{
		to: '',
		text: 'Dashboard',
	},
	{
		to: 'clipboards',
		text: 'Clipboards',
	},
	{
		to: 'conversations',
		text: 'Conversations',
	},
	{
		to: 'files',
		text: 'Files',
		submenu: [
			{
				to: 'files/upload',
				text: 'Upload',
			},
			{
				to: 'files/proxy',
				text: 'Proxy',
			},
		],
	},
]

function DashboardSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<h1 className='text-xl font-semibold'>Daftarche</h1>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Apps</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{links.map((link, index) => {
								return (
									<SidebarMenuItem key={index}>
										<SidebarMenuButton asChild>
											<NavLink
												to={link.to}
												className={({ isActive }) =>
													isActive ? 'text-primary' : ''
												}
											>
												{link.text}
											</NavLink>
										</SidebarMenuButton>
										{link.submenu && (
											<SidebarMenuSub>
												{link.submenu.map((sub, index) => {
													return (
														<SidebarMenuItem key={index}>
															<SidebarMenuButton asChild>
																<NavLink
																	to={sub.to}
																	className={({ isActive }) =>
																		isActive
																			? 'text-primary'
																			: ''
																	}
																>
																	{sub.text}
																</NavLink>
															</SidebarMenuButton>
														</SidebarMenuItem>
													)
												})}
											</SidebarMenuSub>
										)}
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Link to='/' className='px-2'>
					return to home
				</Link>
			</SidebarFooter>
		</Sidebar>
	)
}

export default memo(DashboardSidebar)
