import Link from "next/link";

type ThankYouPageProps = {
	searchParams: Promise<{ fullName?: string; email?: string }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
	const { fullName, email } = await searchParams;

	return (
		<main className="min-h-full w-full bg-white text-gray-900 flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm text-center">
				<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
					<svg
						className="h-8 w-8 text-green-600"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>

				<h1 className="text-2xl font-semibold text-gray-900 mb-2">
					Thank You!
				</h1>
				<p className="text-gray-600 mb-6">
					Your submission has been received successfully. We will get back to
					you soon.
				</p>

				{fullName && email && (
					<div className="rounded-md border border-gray-200 bg-gray-50 px-6 py-4 mb-8 text-left">
						<p className="text-sm text-gray-600 mb-1">Confirmation sent to:</p>
						<p className="font-medium text-gray-900">{fullName}</p>
						<p className="text-gray-700">{email}</p>
						<p className="text-sm text-gray-500 mt-3">
							A confirmation email has been sent to your inbox.
						</p>
					</div>
				)}

				<Link
					href="/"
					className="inline-block rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Back to Home
				</Link>
			</div>
		</main>
	);
}
