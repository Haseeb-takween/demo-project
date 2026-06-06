import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
	throw new Error('Missing environment variables');
}
export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();
		if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
			const token = jwt.sign({ email }, JWT_SECRET!, { expiresIn: '1h' });

			const response = NextResponse.json(
				{ message: 'Login successful' },
				{ status: 200 },
			);
			response.cookies.set('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 3600,
				path: '/',
			});
			return response;
		} else {
			return NextResponse.json(
				{ error: 'Invalid credentials' },
				{ status: 401 },
			);
		}
	} catch (error) {
		return NextResponse.json({ error: 'Login failed' }, { status: 500 });
	}
}
