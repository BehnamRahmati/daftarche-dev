import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store/store'

export default function useUser() {
    const {user , isLoading , error} = useAppSelector((state: RootState) => state.user)
    return {
        user,
        isLoading,
        error,
        isLogin: !!user?.id
    }
}