import React, { useState, useEffect } from 'react'
import { Auth } from '../../services/auth'

export const AuthCheck: React.SFC = ({ children }) => {
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => (Auth.isAuthenticated() ? setReady(true) : Auth.login()))

  return ready && <>{children}</>
}
