'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const router = useRouter()

  return (
    <div className='w-full h-[10vh] flex items-center justify-between'>
        <h1 className='text-2xl text-indigo-900 font-bold' >UnivLogo</h1>
        <div className='flex items-center justify-center space-x-4'>
            <button 
                className='py-3 px-4 bg-indigo-500 text-white rounded-xl hover:bg-white hover:text-indigo-500 delay-50 transition-all duration-300 ease-in-out'
                onClick={() => router.push('/auth/login')}    
            >
                Sign In
            </button>
            <button 
                className='py-3 px-4 bg-white text-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white delay-50 transition-all duration-300 ease-in-out'
                onClick={() => router.push('/auth/register')}      
            >
                Register
            </button>
        </div>
    </div>
  )
}

export default Navbar