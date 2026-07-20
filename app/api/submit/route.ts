import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/';
import Submission from '@/models/submission';
import transporter from '@/lib/email';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { fullName, email, phone, service, preferredDate, message } = body ?? {};

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

		if (!process.env.MONGODB_URI) {
			console.error('[submit] MONGODB_URI is not set');
			return NextResponse.json(
				{ error: 'Server misconfigured: database' },
				{ status: 500 },
			);
		}

		await connectDB();

		await Submission.create({
			fullName,
			email,
			phone,
			service,
			preferredDate,
			message,
			reviewed: false,
		});

		// Email is best-effort — do not fail the enquiry if SMTP is down
		if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
			try {
				await transporter.sendMail({
					from: `"Servio" <${process.env.EMAIL_USER}>`,
					to: email,
					subject: 'Thank you for your Servio enquiry',
					html: `<p>Hi ${fullName},</p><p>Thanks for your enquiry. We will get back to you soon.</p>`,
				});
			} catch (mailError) {
				console.error('[submit] Email failed:', mailError);
			}
		} else {
			console.warn('[submit] EMAIL_USER / EMAIL_PASS not set — skipped confirmation email');
		}

		return NextResponse.json(
			{
				message: 'Submission created successfully',
				fullName,
				email,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error('[submit] Error:', error);

		if (error instanceof Error && error.name === 'ValidationError') {
			return NextResponse.json(
				{ error: error.message },
				{ status: 400 },
			);
		}

		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
