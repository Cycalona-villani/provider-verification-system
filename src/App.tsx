import './App.css'

function App() {
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dr. Jordan Smith</td>
            <td>Family Medicine</td>
            <td>Pending verification</td>
          </tr>
          <tr>
            <td>Dr. Taylor Lee</td>
            <td>Psychiatry</td>
            <td>Needs manual review</td>
          </tr>
        </tbody>
      </table>

      <p>Demo data only. No real verification has been performed.</p>
    </main>
  )
}

export default App