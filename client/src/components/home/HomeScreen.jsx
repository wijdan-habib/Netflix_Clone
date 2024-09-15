import React from 'react'
import FirstPage from './FirstPage'
import AuthScreen from './AuthScreen'

export default function HomeScreen() {
  const user = false 
    return (
    <div>
        {user ? <FirstPage/> : <AuthScreen/>}
    </div>
  )
}
