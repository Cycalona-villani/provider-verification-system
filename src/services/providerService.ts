
export type Provider = {
    id: number;
    name: string;
    specialty: string;
    state: string;
    licenseStatus: 'active' | 'expired' | 'suspended';
    onboardingStatus: 'pending' | 'in_review' | 'approved';
};

export async function getProviders(): Promise<Provider[]> {
    const response = await fetch('http://localhost:3001/api/providers');

    if (!response.ok) {
        throw new Error('Unable to retrieve providers');
    }

    return response.json();
}
