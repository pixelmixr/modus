import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthCheck } from './auth/auth-check'

export const App: React.SFC = props => {
  return (
    <>
      <Router>
        <Route path='/auth/callback' component={AuthCallback} />
      </Router>
      <AuthCheck>
        <Router>
          <Switch />
        </Router>
      </AuthCheck>
    </>
  )
}
