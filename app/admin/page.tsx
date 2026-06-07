'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Submission = {
	_id: string;
	fullName: string;
	email: string;
	phone: string;
	service: string;
	preferredDate: string;
	message: string;
	reviewed: boolean;
	createdAt: string;
};

export default function AdminDashboardPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [submissions, setSubmissions] = useState<Submission[]>([]);

	useEffect(() => {
		async function loadSubmissions() {
			try {
				const res = await fetch('/api/admin/submissions');
				const data = await res.json();

				if (res.status === 401) {
					router.push('/admin/login');
					return;
				}

				if (!res.ok) {
					setError(data.error || 'Failed to load submissions');
					return;
				}

				setSubmissions(data);
			} catch {
				setError('Something went wrong. Please try again.');
			} finally {
				setLoading(false);
			}
		}

		loadSubmissions();
	}, [router]);

	async function handleLogout() {
		await fetch('/api/admin/logout', { method: 'POST' });
		router.push('/admin/login');
	}

	async function toggleReviewed(id: string, current: boolean) {
		const next = !current;

		setSubmissions((prev) =>
			prev.map((s) => (s._id === id ? { ...s, reviewed: next } : s)),
		);

		const res = await fetch(`/api/admin/submissions/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ reviewed: next }),
		});

		if (!res.ok) {
			setSubmissions((prev) =>
				prev.map((s) => (s._id === id ? { ...s, reviewed: current } : s)),
			);
		}
	}

	const reviewedCount = submissions.filter((s) => s.reviewed).length;
	const pendingCount = submissions.length - reviewedCount;

	return (
		<div className="min-h-screen w-full bg-gray-50">

			{/* Top navbar */}
			<header className="border-b border-gray-200 bg-white px-6 py-4">
				<div className="mx-auto flex max-w-7xl items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
							<svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
							</svg>
						</div>
						<span className="text-base font-semibold text-gray-900">Admin Dashboard</span>
					</div>
					<button
						type="button"
						onClick={handleLogout}
						className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
					>
						<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
						</svg>
						Logout
					</button>
				</div>
			</header>

			<main className="mx-auto max-w-7xl px-6 py-8">

				{/* Stats row */}
				{!loading && !error && submissions.length > 0 && (
					<div className="mb-6 grid grid-cols-3 gap-4">
						<div className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
							<p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</p>
							<p className="mt-1 text-2xl font-semibold text-gray-900">{submissions.length}</p>
						</div>
						<div className="rounded-xl border border-yellow-200 bg-yellow-50 px-5 py-4 shadow-sm">
							<p className="text-xs font-medium text-yellow-600 uppercase tracking-wide">Pending</p>
							<p className="mt-1 text-2xl font-semibold text-yellow-700">{pendingCount}</p>
						</div>
						<div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 shadow-sm">
							<p className="text-xs font-medium text-green-600 uppercase tracking-wide">Reviewed</p>
							<p className="mt-1 text-2xl font-semibold text-green-700">{reviewedCount}</p>
						</div>
					</div>
				)}

				{/* Section header */}
				<div className="mb-4">
					<h2 className="text-sm font-medium text-gray-700">All Submissions</h2>
					<p className="text-xs text-gray-400">Newest first</p>
				</div>

				{/* States */}
				{loading && (
					<div className="flex items-center justify-center py-20">
						<svg className="h-6 w-6 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
						</svg>
						<span className="ml-2.5 text-sm text-gray-500">Loading submissions…</span>
					</div>
				)}

				{error && (
					<div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
						<svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
						</svg>
						<p className="text-sm text-red-700">{error}</p>
					</div>
				)}

				{!loading && !error && submissions.length === 0 && (
					<div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20">
						<svg className="h-10 w-10 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
						</svg>
						<p className="text-sm font-medium text-gray-500">No submissions yet</p>
						<p className="text-xs text-gray-400 mt-1">Submissions from the public form will appear here</p>
					</div>
				)}

				{/* Table */}
				{!loading && !error && submissions.length > 0 && (
					<div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
						<table className="min-w-full text-sm">
							<thead>
								<tr className="border-b border-gray-200 bg-gray-50">
									<th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
									<th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
									<th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
									<th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Service</th>
									<th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Pref. Date</th>
									<th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Message</th>
									<th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Submitted</th>
									<th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{submissions.map((item) => (
									<tr
										key={item._id}
										className={item.reviewed ? 'bg-green-50' : 'bg-white hover:bg-gray-50 transition-colors'}
									>
										<td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{item.fullName}</td>
										<td className="px-4 py-3 text-gray-600">{item.email}</td>
										<td className="px-4 py-3 text-gray-600 whitespace-nowrap">{item.phone}</td>
										<td className="px-4 py-3">
											<span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 capitalize">
												{item.service.replace(/-/g, ' ')}
											</span>
										</td>
										<td className="px-4 py-3 text-gray-600 whitespace-nowrap">
											{new Date(item.preferredDate).toLocaleDateString()}
										</td>
										<td className="px-4 py-3 max-w-xs truncate text-gray-600" title={item.message}>
											{item.message}
										</td>
										<td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
											{new Date(item.createdAt).toLocaleString()}
										</td>
										<td className="px-4 py-3 whitespace-nowrap">
											<button
												type="button"
												onClick={() => toggleReviewed(item._id, item.reviewed)}
												className={
													item.reviewed
														? 'inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition-colors group'
														: 'inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-semibold text-yellow-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 transition-colors'
												}
												title={item.reviewed ? 'Click to mark as unreviewed' : 'Click to mark as reviewed'}
											>
												{item.reviewed ? (
													<>
														<svg className="h-3 w-3 group-hover:hidden" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
															<path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
														</svg>
														<svg className="h-3 w-3 hidden group-hover:block" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
															<path fillRule="evenodd" d="M8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
														</svg>
														<span className="group-hover:hidden">Reviewed</span>
														<span className="hidden group-hover:inline">Unmark</span>
													</>
												) : (
													<>
														<svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
															<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
														</svg>
														Mark Reviewed
													</>
												)}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</main>
		</div>
	);
}
