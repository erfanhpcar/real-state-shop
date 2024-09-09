import React from 'react'
import Ads from '../components/Ads'
import NavBar from '../components/Navbar'

function Home() {
  return (
    <div className="relative  min-h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-white">
      <NavBar />
      <Ads />
    </div>
  )
}

export default Home