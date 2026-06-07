import Link from "next/link";

type ThankYouPageProps = {
	searchParams: Promise<{ fullName?: string; email?: string }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
	const { fullName, email } = await searchParams;

	return (
		<div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center px-4 py-12">

			{/* Success mark */}
			<div className="mb-8 flex flex-col items-center gap-3">
				<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 shadow-md">
					<svg
						className="h-6 w-6 text-white"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2.5}
						stroke="currentColor"
						aria-hidden="true"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
					</svg>
				</div>
				<h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Submission Received</h1>
				<p className="text-sm text-gray-500">Thank you for reaching out to us</p>
			</div>

			{/* Card */}
			<div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">

				<p className="text-gray-600 mb-6">
					Your enquiry has been successfully submitted. We will review it and get back to you shortly.
				</p>

				{fullName && email && (
					<div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 mb-8 text-left">
						<p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Confirmation sent to</p>
						<p className="font-semibold text-gray-900">{fullName}</p>
						<p className="text-sm text-gray-600">{email}</p>
						<div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
							<svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
							</svg>
							A confirmation email has been sent to your inbox
						</div>
					</div>
				)}

				<Link
					href="/"
					className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
				>
					<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
						<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
					</svg>
					Back to Home
				</Link>
			</div>

			<p className="mt-6 text-xs text-gray-400">We typically respond within 1–2 business days</p>
		</div>
	);
}
