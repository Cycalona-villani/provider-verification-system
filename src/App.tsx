import { useState } from 'react'
import './App.css'

type CheckResult = {
  identity: 'match' | 'mismatch'
  license: 'active' | 'expired'
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
  const [approvedIds, setApprovedIds] = useState<number[]>([])
  const [message, setMessage] = useState('')

  const selected = providers.find(provider => provider.id === selectedId)

  function checksPassed(id: number) {
    return (
      results[id]?.identity === 'match' &&
      results[id]?.license === 'active'
    )
  }

  function getStatus(id: number) {
    if (checkingId === id) return 'Checking…'
    if (approvedIds.includes(id)) return 'Approved'
    if (!results[id]) return 'Pending verification'
    if (!checksPassed(id)) return 'Needs manual review'
    return 'Checks passed — awaiting approval'
  }

  async function runChecks(id: number) {
    if (checkingId !== null || approvedIds.includes(id)) return

    setMessage('')
    setCheckingId(id)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const result: CheckResult = {
      identity: id === 1 ? 'match' : 'mismatch',
      license: 'active',
    }

    setResults(previous => ({ ...previous, [id]: result }))
    setCheckingId(null)
  }

  function approveProvider(id: number) {
    // Guard the action as well as disabling the button.
    if (
      checkingId !== null ||
      !checksPassed(id) ||
      approvedIds.includes(id)
    ) {
      return
    }

    setApprovedIds(previous => [...previous, id])
    setMessage('Demo approval recorded. Provider may accept patients.')
  }

  return (
    <main>
      <h1>Provider Verification System</h1>
      <p>
        <strong>Trust & Safety demo:</strong> Fictional data and
        simulated checks. Approval controls run only in this browser.
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
              <td>{getStatus(provider.id)}</td>
              <td>
                <button onClick={() => {
                  setSelectedId(provider.id)
                  setMessage('')
                }}>
                  View details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <section aria-labelledby="details-heading">
          <h2 id="details-heading">{selected.name}</h2>
          <dl>
            <dt>Specialty</dt>
            <dd>{selected.specialty}</dd>
            <dt>Practice state</dt>
            <dd>{selected.state}</dd>
            <dt>License number</dt>
            <dd>{selected.license}</dd>
          </dl>

          <div role="status">
            <p>Status: {getStatus(selected.id)}</p>
            <p>
              Identity: {results[selected.id]?.identity ?? 'Not checked'}
            </p>
            <p>
              License: {results[selected.id]?.license ?? 'Not checked'}
            </p>
            <p>
              Accepting patients:{' '}
              {approvedIds.includes(selected.id) ? 'Allowed' : 'Blocked'}
            </p>
            {message && <p>{message}</p>}
          </div>

          {results[selected.id] && !checksPassed(selected.id) && (
            <p>
              Approval blocked: a required check did not pass.
              An authorized reviewer must investigate.
            </p>
          )}

          <button
            disabled={
              checkingId !== null ||
              approvedIds.includes(selected.id)
            }
            onClick={() => runChecks(selected.id)}
          >
            Run demo checks
          </button>
          {' '}
          <button
            disabled={
              checkingId !== null ||
              !checksPassed(selected.id) ||
              approvedIds.includes(selected.id)
            }
            onClick={() => approveProvider(selected.id)}
          >
            Approve provider
          </button>
          {' '}
          <button onClick={() => setSelectedId(null)}>
            Close details
          </button>
        </section>
      )}

      <p>Demo results and approvals reset when you refresh.</p>
    </main>
  )
}

export default App