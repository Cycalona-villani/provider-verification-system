import { useState } from 'react'
import './App.css'

const providers = [
  {
    id: 1,
    name: 'Dr. Jordan Smith',
    specialty: 'Family Medicine',
    status: 'Pending verification',
    state: 'Oklahoma',
    license: 'DEMO-1001',
  },
  {
    id: 2,
    name: 'Dr. Taylor Lee',
    specialty: 'Psychiatry',
    status: 'Needs manual review',
    state: 'Indiana',
    license: 'DEMO-1002',
  },
]

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selected = providers.find(provider => provider.id === selectedId)

  return (
    <main>
      <h1>Provider Verification System</h1>
      <p>Verify provider identity and licenses before approval.</p>

      <h2>Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Specialty</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {providers.map(provider => (
            <tr key={provider.id}>
              <td>{provider.name}</td>
              <td>{provider.specialty}</td>
              <td>{provider.status}</td>
              <td>
                <button onClick={() => setSelectedId(provider.id)}>
                  View details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <section aria-labelledby="details-heading">
          <h2 id="details-heading">Application details</h2>
          <dl>
            <dt>Provider</dt>
            <dd>{selected.name}</dd>
            <dt>Specialty</dt>
            <dd>{selected.specialty}</dd>
            <dt>Practice state</dt>
            <dd>{selected.state}</dd>
            <dt>License number</dt>
            <dd>{selected.license}</dd>
            <dt>Application status</dt>
            <dd>{selected.status}</dd>
          </dl>
          <button onClick={() => setSelectedId(null)}>
            Close details
          </button>
        </section>
      )}

      <p>Demo data only. No real verification has been performed.</p>
    </main>
  )
}

export default App