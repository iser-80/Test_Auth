'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Auth = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
        console.log(password);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            if(!res.ok){
                throw new Error('Failed to register');
            }

            const data = await res.json();
            console.log('data : ', data.user);

            localStorage.setItem('user', JSON.stringify(data.user))
            
            router.replace('/private')

        } catch (error) {
            
        }
    }


  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
        <div className='w-1/4 bg-gray-300 bg-opacity-20 shadow-xl rounded-xl p-10 mx-auto'>
            <div className='w-full h-full flex flex-col items-center'>
                <h2 className='text-2xl font-normal'>Login</h2>
                <form onSubmit={submitHandler}>
                    <input
                        className='w-full border-gray-50 rounded-lg px-6 py-2 mt-10'
                        type='text'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                    />
                    <input
                        className='w-full border-gray-50 rounded-lg px-6 py-2 mt-2'
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                    />
                    <button
                        className='w-full text-white bg-indigo-500 rounded-lg px-6 py-2 mt-3'
                        // onSubmit={() => }
                    >
                        Connect
                    </button>
                </form>
                <p className='text-sm text-gray-500 mt-4' >You don't have an account? <a className='cursor-pointer text-blue-500' onClick={() => router.push('/auth/register')}>Click Here</a> to create one</p>
            </div>
        </div>
    </div>
  )
}

export default Auth