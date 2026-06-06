"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClassName =
	"w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500";

export default function Home() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");
		setLoading(true);

		const form = e.currentTarget;
		const body = {
			fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
			email: (form.elements.namedItem("email") as HTMLInputElement).value,
			phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
			service: (form.elements.namedItem("service") as HTMLSelectElement).value,
			preferredDate: (form.elements.namedItem("preferredDate") as HTMLInputElement).value,
			message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
		};

		const res = await fetch("/api/submit", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		const data = await res.json();
		setLoading(false);

		if (!res.ok) {
			setError(data.error || "Something went wrong");
			return;
		}

		form.reset();
		router.push(`/thank-you?fullName=${data.fullName}&email=${data.email}`);
	}

	return (
		<main className="min-h-full w-full bg-white text-gray-900 flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
				<h1 className="text-2xl font-semibold text-gray-900 mb-2">
					Enquiry Form
				</h1>
				<p className="text-gray-600 mb-8">
					Fill in the form below and we will get back to you.
				</p>

				<form onSubmit={handleSubmit} className="space-y-5">
					{error && (
						<p className="text-sm text-red-600">{error}</p>
					)}

					<div>
						<label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
							Full Name
						</label>
						<input id="fullName" name="fullName" type="text" required className={inputClassName} />
					</div>

					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
							Email Address
						</label>
						<input id="email" name="email" type="email" required className={inputClassName} />
					</div>

					<div>
						<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
							Phone Number
						</label>
						<input id="phone" name="phone" type="tel" required className={inputClassName} />
					</div>

					<div>
						<label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
							Service Required
						</label>
						<select id="service" name="service" required defaultValue="" className={inputClassName}>
							<option value="" disabled>Select a service</option>
							<option value="website-development">Website Development</option>
							<option value="ai-chatbot-enquiry">AI Chatbot Enquiry</option>
							<option value="general-business-enquiry">General Business Enquiry</option>
						</select>
					</div>

					<div>
						<label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
							Preferred Date
						</label>
						<input id="preferredDate" name="preferredDate" type="date" required className={inputClassName} />
					</div>

					<div>
						<label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
							Message
						</label>
						<textarea id="message" name="message" rows={4} required className={inputClassName} />
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
					>
						{loading ? "Submitting..." : "Submit"}
					</button>
				</form>
			</div>
		</main>
	);
}
