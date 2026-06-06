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

	async function markReviewed(id: string) {
		setSubmissions((prev) =>
			prev.map((s) => (s._id === id ? { ...s, reviewed: true } : s)),
		);

		const res = await fetch(`/api/admin/submissions/${id}`, {
			method: 'PATCH',
		});

		if (!res.ok) {
			setSubmissions((prev) =>
				prev.map((s) => (s._id === id ? { ...s, reviewed: false } : s)),
			);
		}
	}

	return (
		<main className='min-h-full w-full bg-white text-gray-900 px-4 py-12'>
			<div className='mx-auto w-full max-w-7xl'>
				<div className='flex items-center justify-between mb-8'>
					<div>
						<h1 className='text-2xl font-semibold mb-2'>Admin Dashboard</h1>
						<p className='text-gray-600'>All form submissions</p>
					</div>
					<button
						type='button'
						onClick={handleLogout}
						className='rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'>
						Logout
					</button>
				</div>

				{loading && <p className='text-gray-600'>Loading submissions...</p>}
				{error && <p className='text-sm text-red-600'>{error}</p>}

				{!loading && !error && submissions.length === 0 && (
					<p className='text-gray-600'>No submissions yet.</p>
				)}

				{!loading && !error && submissions.length > 0 && (
					<div className='overflow-x-auto rounded-lg border border-gray-200'>
						<table className='min-w-full text-sm'>
							<thead className='bg-gray-50 text-left'>
								<tr>
									<th className='px-4 py-3 font-medium'>Name</th>
									<th className='px-4 py-3 font-medium'>Email</th>
									<th className='px-4 py-3 font-medium'>Phone</th>
									<th className='px-4 py-3 font-medium'>Service</th>
									<th className='px-4 py-3 font-medium'>Date</th>
									<th className='px-4 py-3 font-medium'>Message</th>
									<th className='px-4 py-3 font-medium'>Submission Time</th>
									<th className='px-4 py-3 font-medium'>Reviewed</th>
								</tr>
							</thead>
							<tbody>
								{submissions.map((item) => (
									<tr
										key={item._id}
										className={
											item.reviewed ?
												'bg-green-50 border-l-4 border-green-500'
											:	'bg-white'
										}>
										<td className='px-4 py-3'>{item.fullName}</td>
										<td className='px-4 py-3'>{item.email}</td>
										<td className='px-4 py-3 whitespace-nowrap'>{item.phone}</td>
										<td className='px-4 py-3'>{item.service}</td>
										<td className='px-4 py-3 whitespace-nowrap'>
											{new Date(item.preferredDate).toLocaleDateString()}
										</td>
										<td
											className='px-4 py-3 max-w-xs truncate'
											title={item.message}>
											{item.message}
										</td>
										<td className='px-4 py-3 whitespace-nowrap'>
											{new Date(item.createdAt).toLocaleString()}
										</td>
										<td className='px-4 py-3'>
											{item.reviewed ?
												<span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold'>
													✅ Reviewed
												</span>
											:	<button
													type='button'
													onClick={() => markReviewed(item._id)}
													className='bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-200 transition'>
													⏳ Mark Reviewed
												</button>
											}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</main>
	);
}
