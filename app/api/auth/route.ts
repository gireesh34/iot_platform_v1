import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs' // Force Node.js runtime

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, action, name } = body;

    // Handle signup
    if (action === 'signup') {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'VIEWER'
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true
        }
      });

      return NextResponse.json({ user });
    }

    // Handle login
    if (action === 'login') {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
          role: true
        }
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }

      const token = jwt.sign(
        { 
          userId: user.id,
          email: user.email,
          role: user.role 
        },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
      );

      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json({ token, user: userWithoutPassword });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 