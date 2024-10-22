'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Auth = () => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isProfessor, setIsProfessor] = useState(false);
    const [error, setError] = useState('');

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {   
        e.preventDefault(); 

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setError('');  // Clear error if email is valid
        console.log(username, email, password, isProfessor);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, isProfessor })
            });

            if (!res.ok) {
                throw new Error('Failed to register');
            }

            const data = await res.json();
            console.log('data : ', data);
            
            localStorage.setItem('user', JSON.stringify(data.user));
            router.replace('/private');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='w-full h-[100vh] flex items-center justify-center'>
            <div className='w-1/4 bg-gray-300 bg-opacity-20 shadow-xl rounded-xl p-10 mx-auto'>
                <div className='w-full h-full flex flex-col items-center'>
                    <h2 className='text-2xl font-normal'>Register</h2>
                    <form onSubmit={submitHandler}>
                        <input
                            className='w-full border-gray-50 rounded-lg px-6 py-2 mt-10'
                            type='text'
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='username ..'
                        />
                        <input
                            className='w-full border-gray-50 rounded-lg px-6 py-2 mt-2'
                            type='text'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='email ..'
                        />
                        <input
                            className='w-full border-gray-50 rounded-lg px-6 py-2 mt-2'
                            type='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='password ..'
                        />
                        <div className='mt-4 ml-2 flex items-center'>
                            <input
                                type='checkbox'
                                id='professor'
                                checked={isProfessor}
                                onChange={(e) => setIsProfessor(e.target.checked)}
                                className='mr-2'
                            />
                            <label htmlFor='professor' className='text-sm'>I am a Professor</label>
                        </div>
                        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
                        <button
                            className='w-full text-white bg-indigo-500 rounded-lg px-6 py-2 mt-3'
                            type="submit"
                        >
                            Connect
                        </button>
                    </form>
                    <p className='text-sm text-gray-500 mt-4'>
                        Already have an account? <a className='cursor-pointer text-blue-500' onClick={() => router.push('/auth/login')}>Click Here</a> to login
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
