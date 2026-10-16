import { useState } from 'react'
import './App.css'

type CheckResult = {
  identity: string
  license: string
  status: string
}

const providers = [
  {
    id: 1,
    name: 'Dr. Jordan Smith',
    specialty: 'Family Medicine',
    state: 'Oklahoma',
    license: 'DEMO-1001',
  },
  {
    id: 2,
    name: 'Dr. Taylor Lee',
    specialty: 'Psychiatry',
    state: 'Indiana',
    license: 'DEMO-1002',
  },
]

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [results, setResults] = useState<Record<number, CheckResult>>({})
  const [checkingId, setCheckingId] = useState<number | null>(null)

  const selected = providers.find(provider => provider.id === selectedId)

  async function runChecks(id: number) {
    setCheckingId(id)

    // Simulate waiting for an outside verification service.
    await new Promise(resolve => setTimeout(resolve, 1000))

    const result: CheckResult = id === 1
      ? {
          identity: 'Match',
          license: 'Active',
          status: 'Checks passed — awaiting approval',
        }
      : {
          identity: 'Name mismatch — manual review required',
          license: 'Active',
          status: 'Needs manual review',
        }

    setResults(previous => ({ ...previous, [id]: result }))
    setCheckingId(null)
  }

  return (
    <main>
      <h1>Provider Verification System</h1>
      <p>Verify provider identity and licenses before approval.</p>
      <p>
        <strong>Demo mode:</strong> All data and check results are
        fictional. No outside service is connected.
      </p>

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
              <td>
                {checkingId === provider.id
                  ? 'Checking…'
                  : results[provider.id]?.status ?? 'Pending verification'}
              </td>
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
          </dl>

          <div role="status">
            {checkingId === selected.id ? (
              <p>Running simulated checks…</p>
            ) : results[selected.id] ? (
              <>
                <p>Identity: {results[selected.id].identity}</p>
                <p>License: {results[selected.id].license}</p>
                <p>Status: {results[selected.id].status}</p>
              </>
            ) : (
              <p>Verification has not started.</p>
            )}
          </div>

          <button
            disabled={checkingId !== null}
            onClick={() => runChecks(selected.id)}
          >
            Run demo checks
          </button>
          {' '}
          <button onClick={() => setSelectedId(null)}>
            Close details
          </button>
        </section>
      )}

      <p>Demo results reset when you refresh the page.</p>
    </main>
  )
}

export default App