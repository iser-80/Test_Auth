// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import user from '@/app/models/user';
import connectMongo from '@/app/mongo';
import bcrypt from 'bcryptjs';
import { signToken } from '@/app/util/jwt';

export async function POST(req: Request) {
    try {
        await connectMongo();
        const { email, password } = await req.json();

        // Find the user by email
        const foundUser = await user.findOne({ email });
        if (!foundUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = signToken(foundUser._id.toString()); // Sign a JWT token

        // Set token as a cookie
        const res = NextResponse.json({ message: 'Login successful', user: foundUser }, { status: 200 });
        res.cookies.set('token', token, { httpOnly: true });

        return res;
    } catch (error) {
        console.error('Error logging in user:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
