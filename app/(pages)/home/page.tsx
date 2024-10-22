import HeroSecion from '@/app/componants/heroSection'
import Navbar from '@/app/componants/navbar'
import React from 'react'

const Start = () => {
  return (
    <div className='w-full h-[100vh] bg-[#F5F7F8]'>
        <div className='w-[80%] h-full mx-auto'>
          <Navbar />
          <HeroSecion />
        </div>
    </div>
  )
}

export default Start