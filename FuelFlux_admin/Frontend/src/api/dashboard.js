// API utility for dashboard stats
export async function fetchDashboardStats() {
  const res = await fetch('/api/dashboard', { credentials: 'include' });
  console.log('Dashboard stats response status:', res.status);
  if (!res.ok) throw new Error('Failed to fetch dashboard stats');
  return await res.json();
}
