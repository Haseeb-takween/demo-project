"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClassName =
	"w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500";

export default function AdminLoginPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");
		setLoading(true);

		const form = e.currentTarget;
		const email = (form.elements.namedItem("email") as HTMLInputElement).value;
		const password = (form.elements.namedItem("password") as HTMLInputElement)
			.value;

		try {
			const res = await fetch("/api/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.error || "Login failed");
				return;
			}

			router.push("/admin");
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="min-h-full w-full bg-white text-gray-900 flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
				<h1 className="text-2xl font-semibold text-gray-900 mb-2">
					Admin Login
				</h1>
				<p className="text-gray-600 mb-8">Sign in to view submissions.</p>

				<form onSubmit={handleSubmit} className="space-y-5">
					{error && <p className="text-sm text-red-600">{error}</p>}

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							autoComplete="email"
							className={inputClassName}
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							autoComplete="current-password"
							className={inputClassName}
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
					>
						{loading ? "Signing in..." : "Sign in"}
					</button>
				</form>
			</div>
		</main>
	);
}
