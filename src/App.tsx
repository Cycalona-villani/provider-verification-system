import { useState } from 'react'
import './App.css'

type Checks = {
  identity: 'match' | 'mismatch'
  license: 'active' | 'expired'
}

type Review = {
  decision: 'confirmed' | 'rejected'
  reason: string
}

type AuditEvent = {
  providerId: number
  time: string
  actor: string
  action: string
  reason: string
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
    {
    id: 3,
    name: 'Dr. Morgan Davis',
    specialty: 'Internal Medicine',
    state: 'Oklahoma',
    license: 'DEMO-1003',
  },
]

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [checks, setChecks] = useState<Record<number, Checks>>({})
  const [reviews, setReviews] = useState<Record<number, Review>>({})
  const [approvedIds, setApprovedIds] = useState<number[]>([])
  const [checkingId, setCheckingId] = useState<number | null>(null)
  const [reason, setReason] = useState('')
  const [history, setHistory] = useState<AuditEvent[]>([])
  const [simulateOutage, setSimulateOutage] = useState(false)
  const [errors, setErrors] = useState<Record<number, string>>({})

  const selected = providers.find(p => p.id === selectedId)

  function record(
  providerId: number,
  actor: string,
  action: string,
  reason: string
) {
  const event: AuditEvent = {
    providerId,
    time: new Date().toISOString(),
    actor,
    action,
    reason,
  }

  setHistory(previous => [...previous, event])
}

  async function runChecks(id: number) {
  if (checkingId !== null || checks[id]) return

  const shouldFail = simulateOutage

  setCheckingId(id)
  setErrors(previous => ({ ...previous, [id]: '' }))
  record(id, 'Demo service', 'Checks started', 'Verification requested')

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (shouldFail) {
      throw new Error('Verification service unavailable. Please retry.')
    }

    const result: Checks = {
      identity: id === 1 ? 'match' : 'mismatch',
      license: id === 3 ? 'expired' : 'active',
}

    setChecks(previous => ({ ...previous, [id]: result }))
    record(
      id,
      'Demo service',
      'Checks completed',
      `Identity: ${result.identity}; license: ${result.license}`,
    )
  } catch {
    setErrors(previous => ({
      ...previous,
      [id]: 'Verification service unavailable. Please retry.',
    }))

    record(
      id,
      'Demo service',
      'Verification unavailable',
      'No verification result received; approval remains blocked',
    )
  } finally {
    setCheckingId(null)
  }
}

  function eligible(id: number) {
    const identityConfirmed =
      checks[id]?.identity === 'match' ||
      reviews[id]?.decision === 'confirmed'

    return (
      checks[id]?.license === 'active' &&
      identityConfirmed &&
      reviews[id]?.decision !== 'rejected'
    )
  }

  function status(id: number) {
    if (checkingId === id) return 'Checking…'
    if (approvedIds.includes(id)) return 'Approved'
    if (reviews[id]?.decision === 'rejected') return 'Rejected'
    if (!checks[id]) return 'Pending verification'
    if (!eligible(id)) return 'Needs manual review'
    return 'Eligible — awaiting approval'
  }


  function reviewIdentity(id: number, decision: Review['decision']) {
    const explanation = reason.trim()

    if (
      !explanation ||
      checkingId !== null ||
      checks[id]?.identity !== 'mismatch' ||
      reviews[id] ||
      approvedIds.includes(id)
    ) return

    setReviews(previous => ({
      ...previous,
      [id]: { decision, reason: explanation },
    }))
    record(
      id,
      'Demo reviewer',
      decision === 'confirmed' ? 'Identity confirmed' : 'Application rejected',
      explanation,
    )
    setReason('')
  }

  function approve(id: number) {
    if (
      checkingId !== null ||
      !eligible(id) ||
      approvedIds.includes(id)
    ) return

    setApprovedIds(previous => [...previous, id])
    record(
      id,
      'Demo reviewer',
      'Provider approved',
      'Required checks satisfied; patient access enabled',
    )
  }

  return (
    <main>
      <h1>Provider Verification System</h1>
      <p>
        <strong>Trust & Safety demo:</strong> Fictional data, simulated
        checks, and a simulated reviewer. No real authorization service
        is connected.
      </p>
    <label>
  <input
    type="checkbox"
    checked={simulateOutage}
    disabled={checkingId !== null}
    onChange={event => setSimulateOutage(event.target.checked)}
  />
  {' '}Simulate verification service outage
    </label>
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
              <td>{status(provider.id)}</td>
              <td>
                <button onClick={() => {
                  setSelectedId(provider.id)
                  setReason('')
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
          <p>Specialty: {selected.specialty}</p>
          <p>Practice state: {selected.state}</p>
          <p>License number: {selected.license}</p>

          <div role="status">
            <p>Status: {status(selected.id)}</p>
            <p>
              Identity check: {checks[selected.id]?.identity ?? 'Not checked'}
            </p>
            <p>
              License check: {checks[selected.id]?.license ?? 'Not checked'}
            </p>
            <p>
              Accepting patients:{' '}
              {approvedIds.includes(selected.id) ? 'Allowed' : 'Blocked'}
            </p>
          </div>

          {errors[selected.id] && (
  <p role="alert">{errors[selected.id]}</p>
)}

          <button
            disabled={checkingId !== null || !!checks[selected.id]}
            onClick={() => runChecks(selected.id)}
          >
            Run demo checks
          </button>

          {checks[selected.id]?.identity === 'mismatch' &&
            !reviews[selected.id] && (
              <section aria-labelledby="review-heading">
                <h3 id="review-heading">Manual identity review</h3>
                <p>
                  Demo scenario: investigate whether the name mismatch
                  is explained by supporting evidence.
                </p>
                <label htmlFor="review-reason">
                  Evidence reviewed and reason for decision (required)
                </label>
                <br />
                <textarea
                  id="review-reason"
                  rows={4}
                  value={reason}
                  onChange={event => setReason(event.target.value)}
                />
                <br />
                <button
                  disabled={!reason.trim() || checkingId !== null}
                  onClick={() => reviewIdentity(selected.id, 'confirmed')}
                >
                  Confirm identity
                </button>
                {' '}
                <button
                  disabled={!reason.trim() || checkingId !== null}
                  onClick={() => reviewIdentity(selected.id, 'rejected')}
                >
                  Reject application
                </button>
              </section>
            )}

          {reviews[selected.id] && (
            <p>
              Review: {reviews[selected.id].decision}. Reason:{' '}
              {reviews[selected.id].reason}
            </p>
          )}

          <p>
            <button
              disabled={
                checkingId !== null ||
                !eligible(selected.id) ||
                approvedIds.includes(selected.id)
              }
              onClick={() => approve(selected.id)}
            >
              Approve provider
            </button>
            {' '}
            <button onClick={() => setSelectedId(null)}>
              Close details
            </button>
          </p>

          <h3>Decision history</h3>
          {history.some(event => event.providerId === selected.id) ? (
            <ol>
              {history
                .filter(event => event.providerId === selected.id)
                .map((event, index) => (
                  <li key={index}>
                    <strong>{event.action}</strong>
                    <br />
                    {event.actor} · {new Date(event.time).toLocaleString()}
                    <br />
                    {event.reason}
                  </li>
                ))}
            </ol>
          ) : (
            <p>No events recorded.</p>
          )}
        </section>
      )}

      <p>
        All demo data resets on refresh. Production approval and audit
        records must be enforced and stored by a backend.
      </p>
    </main>
  )
}

export default App