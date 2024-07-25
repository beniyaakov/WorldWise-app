import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/FackAuthContext'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
    children:React.ReactNode
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const navigate = useNavigate()
    const {isAuthenticated} = useAuth()

    useEffect(()=>{
        if(!isAuthenticated) navigate('/')
    },[navigate,isAuthenticated])
  return (
        isAuthenticated? children : null
  )
}