import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";
import connectDB from "@/lib/db/";
import Submission from "@/models/submission";

export async function GET(request: NextRequest) {
	const adminEmail = getAdminFromRequest(request);

	if (!adminEmail) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		if (!process.env.MONGODB_URI) {
			console.error("[admin/submissions] MONGODB_URI is not set");
			return NextResponse.json(
				{ error: "Server misconfigured: database" },
				{ status: 500 },
			);
		}

		await connectDB();
		const submissions = await Submission.find().sort({ createdAt: -1 }).lean();

		return NextResponse.json(submissions);
	} catch (error) {
		console.error("[admin/submissions] Error:", error);
		return NextResponse.json(
			{ error: "Failed to load submissions" },
			{ status: 500 },
		);
	}
}
