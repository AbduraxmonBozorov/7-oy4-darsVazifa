import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MainLayout({children, theme}) {
 
  
  return (
    <div>
      <Header theme={theme}></Header>
      {children}
      <Footer></Footer>
    </div>
  )
}

export default MainLayout
