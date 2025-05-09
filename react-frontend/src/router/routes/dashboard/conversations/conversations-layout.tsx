import ListLoading from '@/components/list-loading'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router'
const Contactslist = lazy(() => import('@/components/dashboard/conversations/contacts-list'))
const LatestList = lazy(() => import('@/components/dashboard/conversations/latest-list'))

export default function ConversationsLayout() {
	return (
		<div className='flex flex-col lg:flex-row h-full'>
			<div className='lg:w-80 border-r border-r-sidebar-border pr-2.5'>
				<Accordion type='single' collapsible defaultValue='latest'>
					<AccordionItem value='latest'>
						<AccordionTrigger>Latest conversations :</AccordionTrigger>
						<AccordionContent asChild>
							<LatestList />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='contacts'>
						<AccordionTrigger>Contacts :</AccordionTrigger>
						<AccordionContent asChild>
							<div className='p-1'>
								<Suspense fallback={<ListLoading />}>
									<Contactslist />
								</Suspense>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
			<div className='flex-1 p-2.5'>
				<Outlet />
			</div>
		</div>
	)
}
