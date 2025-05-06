import Contactslist from '@/components/dashboard/conversations/contacts-list'
import LatestList from '@/components/dashboard/conversations/latest-list'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Outlet } from 'react-router'

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
							<Contactslist />
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
