import React from 'react'
import {HeaderMenu} from './header.jsx'

export const PageTemplate = ({children}) => {
  return (
    <div>
      <HeaderMenu />
      {children}
    </div>
  )
}
