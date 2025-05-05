
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router'

export default function Authlayout() {
  const {user} = useAppSelector((state: RootState) => state.user)
  const [isLoggedin , setIsLoggedin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    } else {
      setIsLoggedin(true)
    }
  }, [user, navigate])

  if(!isLoggedin) return null

  return (
    <Outlet />
  )
}
