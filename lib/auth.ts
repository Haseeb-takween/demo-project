import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export function getAdminFromRequest(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	if (!token || !JWT_SECRET) return null;

	try {
		const payload = jwt.verify(token, JWT_SECRET) as { email: string };
		return payload.email;
	} catch {
		return null;
	}
}
