// app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import user from '@/app/models/user';
import connectMongo from '@/app/mongo';
import { signToken } from '@/app/util/jwt';

export async function POST(req: Request) {
    try {
        await connectMongo();
        const { username, email, password, isProfessor } = await req.json();

        // Create a new user
        const newUser = new user({ username, email, password, isProfessor });
        await newUser.save();

        const token = signToken(newUser._id.toString())
        const res = NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
        res.cookies.set('token', token, {httpOnly: true})
        
        return res
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
