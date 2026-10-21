
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://cycalona-villani.github.io',
  ],
}));

app.use(express.json());

app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'Provider Onboarding API',
        message: 'Backend is running successfully',
    });
});


type Provider = {
    id: number;
    name: string;
    specialty: string;
    state: string;
    licenseStatus: 'active' | 'expired' | 'suspended';
    onboardingStatus: 'pending' | 'in_review' | 'approved';
};

const providers: Provider[] = [
    {
        id: 1,
        name: 'Sarah Mitchell',
        specialty: 'Clinical Psychology',
        state: 'CA',
        licenseStatus: 'active',
        onboardingStatus: 'pending',
    },
    {
        id: 2,
        name: 'James Carter',
        specialty: 'Mental Health Counseling',
        state: 'TX',
        licenseStatus: 'active',
        onboardingStatus: 'in_review',
    },
    {
        id: 3,
        name: 'Emily Roberts',
        specialty: 'Marriage and Family Therapy',
        state: 'NY',
        licenseStatus: 'expired',
        onboardingStatus: 'pending',
    },
];

app.get('/api/providers', (_req, res) => {
    res.json(providers);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
