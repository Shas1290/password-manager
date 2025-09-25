import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'
import Manager from './components/Manager'


function App() {


  return (

    <>
     <div className="flex flex-col min-h-screen ">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content expands to fill space */}
      <main className="min-h-[100vh] relative">
        <Manager />
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
    </>
  )
}

export default App
