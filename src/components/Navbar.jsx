import React from 'react'
import "./styles.css";




const Navbar = () => {
    <link rel="stylesheet" href="Navbar.css" />
    return (
        <nav className='flex justify-around  w-full  bg-purple-600 h-16'>
            <div className="logo">
                <h1 className='text-white font-bold text-2xl'>NewPass</h1>
               
            </div>
            <ul className='list mr-8 flex gap-3 doco font-cursive '>
                <li >
                      <a  href="/" className=" cursor-pointer text-white hover:font-bold">Home</a>
                </li>
                <li>
                     <a  href="/about" className='text-white hover:font-bold'>About</a>
                </li>
                <li>  
                    <a  href="/contact" className='text-white hover:font-bold pr-8'>Contact</a>
                </li>  
            </ul>
            <button className="logogit flex gap-0 bg-pink-500 rounded-full w-24 h-11 ">
                <img src="/logo.svg" alt="" />
               <div className='github cursor-pointer'>GitHub</div> 
            </button>
          
           
           

        </nav>
    )
}

export default Navbar
