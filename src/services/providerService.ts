
export type Provider = {
    id: number;
    name: string;
    specialty: string;
    state: string;
    licenseStatus: 'active' | 'expired' | 'suspended';
    onboardingStatus: 'pending' | 'in_review' | 'approved';
};

export async function getProviders(): Promise<Provider[]> {
  const apiUrl = import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? 'http://localhost:3001' : '')

  if (!apiUrl) {
    throw new Error('Provider API is not configured')
  }

  const response = await fetch(
    `${apiUrl.replace(/\/$/, '')}/api/providers`,
  )

  if (!response.ok) {
    throw new Error('Unable to retrieve providers')
  }

  return response.json()
}