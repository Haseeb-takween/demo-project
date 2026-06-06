import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";
import connectDB from "@/lib/db/";
import Submission from "@/models/submission";

type RouteContext = {
	params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
	const adminEmail = getAdminFromRequest(request);

	if (!adminEmail) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { id } = await context.params;

		await connectDB();

		const updated = await Submission.findByIdAndUpdate(
			id,
			{ reviewed: true },
			{ new: true },
		).lean();

		if (!updated) {
			return NextResponse.json({ error: "Not found" }, { status: 404 });
		}

		return NextResponse.json(updated);
	} catch {
		return NextResponse.json(
			{ error: "Failed to update submission" },
			{ status: 500 },
		);
	}
}
