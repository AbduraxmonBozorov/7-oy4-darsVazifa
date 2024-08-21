import React from 'react'
import Header from '../components/Header'

function MainLayout({children, theme}) {
 
  
  return (
    <div>
      <Header theme={theme}></Header>
      {children}
    </div>
  )
}

export default MainLayout
