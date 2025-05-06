// Define Enums first (assuming they are exported from prisma client or defined manually)
export type TRole = 'USER' | 'ADMIN' | 'SUPERADMIN' // Already in types.ts, potentially use Prisma generated type
export type TMediaType = 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO' | 'OTHER'
export type TFileType = 'DIRECT' | 'PROXY'
export type TFileStatus = 'PENDING' | 'COMPLETED' | 'FAILED'

// Define types for Models

export type TUser = {
	id: string
	name?: string | null
	bio?: string | null
	email: string
	emailVerified?: Date | null
	image?: string | null
	hashedPassword?: string | null
	role: TRole // Assuming Role enum/type is available
	createdAt: Date
	updatedAt: Date
	isOnline: boolean
	lastActive?: Date | null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pushSubscription?: any | null // Prisma.JsonValue or a specific type
	deviceReady: boolean
	// Relations (optional, depending on need)
	accounts: TAccount[]
	sessions: TSession[]
	messages: TMessage[]
	conversations: TConversationParticipant[]
	clipboard: TClipboard[]
	contacts: TContact[]
	inContacts: TContact[]
	files: TFile[]
}

type TAccount = {
	userId: string
	type: string
	provider: string
	providerAccountId: string
	refresh_token?: string | null
	access_token?: string | null
	expires_at?: number | null
	token_type?: string | null
	scope?: string | null
	id_token?: string | null
	session_state?: string | null
	createdAt: Date
	updatedAt: Date
	// Relation
	user: TUser
}

type TSession = {
	sessionToken: string
	userId: string
	expires: Date
	createdAt: Date
	updatedAt: Date
	// Relation
	user: TUser
}

export type TClipboard = {
	id: string
	content: string
	userid: string
	createdAt: Date
	updatedAt: Date
	// Relation
	user: TUser
}

export type TConversation = {
	id: string
	createdAt: Date
	// Relations
	participants: TConversationParticipant[]
	messages: TMessage[]
}

export type TConversationParticipant = {
	id: string
	conversationId: string
	userId: string
	// Relations
	conversation: TConversation
	user: TUser
}

export type TContact = {
	id: string
	ownerId: string
	contactId: string
	createdAt: Date
	// Relations
	owner: TUser
	contact: TUser
}

export type TMessage = {
	id: string
	content?: string | null
	senderId?: string | null
	conversationId: string
	createdAt: Date
	received: boolean
	read: boolean
	parentId?: string | null
	// Relations
	media: TMedia[]
	sender?: TUser | null
	conversation: TConversation
	parent?: TMessage | null
	replies: TMessage[]
}

export type TMedia = {
	id: string
	url: string
	type: TMediaType // Assuming MediaType enum/type is available
	mimeType?: string | null
	filename?: string | null
	size?: number | null
	width?: number | null
	height?: number | null
	duration?: number | null
	thumbnailUrl?: string | null
	messageId: string
	createdAt: Date
	// Relation
	message: TMessage
}

export type TFile = {
	id: string
	url: string
	filename: string
	type: TFileType // Assuming FileType enum/type is available
	size: number
	mimeType: string
	status: TFileStatus // Assuming FileStatus enum/type is available
	virusScanStatus: string
	userId: string
	createdAt: Date
	updatedAt: Date
	deletedAt?: Date | null
	downloads: number
	width?: number | null
	height?: number | null
	duration?: number | null
	thumbnailUrl?: string | null
	// Relation
	user: TUser
}
