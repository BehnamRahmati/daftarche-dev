import ConversationCreateForm from '@/components/dashboard/conversations/conversation-create-form'

export default function Conversations() {
	return (
		<div className='flex flex-col justify-center items-center gap-10 h-full'>
			<div className='text-xl  text-muted-foreground'>No conversations yet</div>
			<ConversationCreateForm />
		</div>
	)
}
