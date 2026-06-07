"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClassName =
	"w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors";

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
		const password = (form.elements.namedItem("password") as HTMLInputElement).value;

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
		<div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center px-4">

			{/* Brand mark */}
			<div className="mb-8 flex flex-col items-center gap-3">
				<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-md">
					<svg
						className="h-6 w-6 text-white"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
						/>
					</svg>
				</div>
				<h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Admin Portal</h1>
				<p className="text-sm text-gray-500">Sign in to your account to continue</p>
			</div>

			{/* Card */}
			<div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

				{error && (
					<div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
						<svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
						</svg>
						<p className="text-sm text-red-700">{error}</p>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
							Email address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							autoComplete="email"
							placeholder="admin@example.com"
							className={inputClassName}
						/>
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							autoComplete="current-password"
							placeholder="••••••••"
							className={inputClassName}
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="mt-1 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
					>
						{loading ? (
							<span className="flex items-center justify-center gap-2">
								<svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
								</svg>
								Signing in…
							</span>
						) : (
							"Sign in"
						)}
					</button>
				</form>
			</div>

			<p className="mt-6 text-xs text-gray-400">Restricted access — authorised personnel only</p>
		</div>
	);
}
