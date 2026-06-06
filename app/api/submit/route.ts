import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/';
import Submission from '@/models/submission';
import transporter from '@/lib/email';

export async function POST(request: NextRequest) {
	try {
		await connectDB();
		const { fullName, email, phone, service, preferredDate, message } =
			await request.json();

		if (
			!fullName ||
			!email ||
			!phone ||
			!service ||
			!preferredDate ||
			!message
		) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 },
			);
		}

		const submission = await Submission.create({
			fullName,
			email,
			phone,
			service,
			preferredDate,
			message,
			reviewed: false,
    });
    await transporter.sendMail({
			from: `"Haseeb Takween Centre" <${process.env.EMAIL_USER}>`,
			to: email,
			subject: 'Thank you for your submission',
			html: `<p>Thank you for your submission ${fullName}. We will get back to you soon.</p>`,
		});
    
   return NextResponse.json(
			{
				message: 'Submission created successfully',
				fullName,
				email,
			},
			{ status: 201 },
		);
	} catch (error) {
		if (error instanceof Error && error.name === 'ValidationError') {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 },
			);
		}

		if (
			error instanceof Error &&
			'code' in error &&
			error.code === 11000
		) {
			return NextResponse.json(
				{ error: 'A submission with this email already exists' },
				{ status: 409 },
			);
		}

		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
