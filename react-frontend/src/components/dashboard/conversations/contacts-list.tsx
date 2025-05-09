import ListLoading from '@/components/list-loading'
import {
	selectContacts,
	selectContactsAreLoading,
	selectContactsError,
} from '@/store/features/contacts/contact-selectors'
import { fetchContacts } from '@/store/features/contacts/contact-thunks'
import { selectUser } from '@/store/features/user/user-selectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Call, Message } from 'iconsax-react'
import { useEffect } from 'react'
import ContactsCreateForm from './contact-create-form'

export default function Contactslist() {
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectUser)
	const userId = user?.id
	const contacts = useAppSelector(selectContacts)
	const contactsLoading = useAppSelector(selectContactsAreLoading)
	const contactsError = useAppSelector(selectContactsError)

	useEffect(() => {
		if (userId) {
			dispatch(fetchContacts(userId))
		}
	}, [userId, dispatch])

	if (contactsLoading) {
		return <ListLoading />
	}
	if (contactsError) {
		return <div className=''>error</div>
	}
	console.warn(contacts)
	return (
		<div>
			<div className='flex flex-col'>
				<ContactsCreateForm />
				{contacts.map(contact => (
					<div key={contact.id} className='flex items-center gap-2.5 p-2.5'>
						<div className='shrink-0 bg-gray-300 size-10 rounded-full'>
							{contact.contact.image && (
								<img src={contact.contact.image} alt={contact.contact.name!} />
							)}
						</div>
						<div className=''>
							<div className='font-light '>{contact.contact.name}</div>
							<div className='font-light text-xs text-muted-foreground truncate'>
								{contact.contact.bio}
							</div>
						</div>
						<div className='mr-0 ml-auto flex items-center gap-1'>
							<Call className='size-5 stroke-foreground' values='Broken' />
							<Message className='size-5 stroke-foreground' values='Broken' />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
