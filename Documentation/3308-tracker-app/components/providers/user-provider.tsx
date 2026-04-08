'use client'

import { createContext, useContext, ReactNode } from 'react'
import { IUser } from '@/types/user/user'

interface UserContextType {
  userInfo: IUser | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ 
  children, 
  userInfo 
}: { 
  children: ReactNode
  userInfo: IUser | null 
}) {
  return (
    <UserContext.Provider value={{ userInfo }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
