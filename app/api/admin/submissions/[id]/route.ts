import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";
import connectDB from "@/lib/db/";
import Submission from "@/models/submission";

type RouteContext = {
	params: Promise<{ id: string }>;
};

export async function DELETE(request: NextRequest, context: RouteContext) {
	const adminEmail = getAdminFromRequest(request);

	if (!adminEmail) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { id } = await context.params;

		await connectDB();

		const deleted = await Submission.findByIdAndDelete(id).lean();

		if (!deleted) {
			return NextResponse.json({ error: "Not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json(
			{ error: "Failed to delete submission" },
			{ status: 500 },
		);
	}
}

export async function PATCH(request: NextRequest, context: RouteContext) {
	const adminEmail = getAdminFromRequest(request);

	if (!adminEmail) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { id } = await context.params;

		await connectDB();

		const body = await request.json().catch(() => ({}));
		const reviewed = typeof body.reviewed === 'boolean' ? body.reviewed : true;

		const updated = await Submission.findByIdAndUpdate(
			id,
			{ reviewed },
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
