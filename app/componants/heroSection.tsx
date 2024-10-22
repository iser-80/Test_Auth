'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const HeroSecion = () => {
    const router = useRouter()

  return (
    <div className='w-full h-[90vh] flex items-center'>
        <div className='w-1/2 h-[70%] px-4 flex flex-col justify-around'>
            <h1 className='text-6xl leading-[1.4] font-bold text-[#19376D]'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. ipsum dolor end
            </h1>
            <p className='text-lg font-normal text-gray-700 text-opacity-40 mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nesciunt amet consectetur adipisicing elit.</p>
            <button 
                className='w-[200px] py-4 px-5 mt-4 text-lg bg-[#19376D] text-white rounded-xl hover:bg-white hover:text-[#19376D] delay-50 transition-all duration-300 ease-in-out'
                onClick={() => router.push('/auth/login')}      
            >
                Get Started
            </button>
        </div>
        <div className='w-1/2 h-[80%] self-end flex justify-center items-center'>
            {/* Add your image here */}
            <Image 
                src="/images/character.png" 
                alt="Hero Image" 
                height={200}
                width={1000}
                // layout="fill" // Makes the image take full height/width of the container
                // objectFit="cover"
                className='rounded-xl'
            />
        </div>
    </div>
  )
}

export default HeroSecion