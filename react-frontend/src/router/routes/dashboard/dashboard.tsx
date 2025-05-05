import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store/store"

export default function Dashbboard() {
	const {user} = useAppSelector((state: RootState) => state.user)
	return <div>{user?.name}</div>
}
