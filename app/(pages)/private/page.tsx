'use client'

// import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Private = () => {
    const router = useRouter();

    const [user, setUser] = useState<any>(null);

    const handleLogout = async () => {
        try {
            // const res = await fetch('/api/auth/logout', {
            //     method: 'POST',
            // });

            // if (res.ok) {
            //     router.push('/auth/login'); // Redirect to login page
            // } else {
            //     console.error('Failed to log out');
            // }

            localStorage.removeItem('user')
            router.push('/')
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        const storedUser = localStorage.getItem('user') 
        // const token = document.cookie.split('; ').find(row => row.startsWith('token='));

        if(!storedUser){
            console.log('token or user not found')
            router.push('/auth/login')
        } else {
            const user = JSON.parse(storedUser);
            setUser(user);
            console.log('stored user : ', user.username)
        }
    }, [router])    

    if (!user) {
        return <div>Loading...</div>;
    }

  return (
    <div className='w-full h-[100vh] bg-[#F5F7F8]'>
        <div className='w-[80%] h-full mx-auto flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-semibold'>Welcome {user.isProfessor ? 'Professor' : 'Student'} {user.username}</h1>
            <button
                className='w-100 h-20 text-white bg-purple-500 rounded-lg px-6 py-2 mt-3'
                onClick={handleLogout}
            >
                Log out
            </button>
        </div>
    </div>
  )
}

export default Private