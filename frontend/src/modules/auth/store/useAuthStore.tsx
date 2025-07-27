import type { IUser } from '@/modules/auth/interfaces/IUser'
import { create } from 'zustand'

const useAuthStore = create<{
  user: IUser | null;
  token: string | null;
  setUser: (user: IUser) => void;
  setToken: (token: string) => void;
}>((set) => {
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  return ({
    user: user ? JSON.parse(user) : null,
    token: token ? token : null,
    setUser: (user: IUser) => set({ user }),
    setToken: (token: string) => set({ token }),
  })
})

export default useAuthStore
export const useUser = () => useAuthStore((state) => state.user)
export const useSetUser = () => useAuthStore((state) => state.setUser)
export const useToken = () => useAuthStore((state) => state.token)
export const useSetToken = () => useAuthStore((state) => state.setToken)