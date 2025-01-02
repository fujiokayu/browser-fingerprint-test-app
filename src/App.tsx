import { useState, useEffect } from 'react'
import FingerprintJS, { Agent, GetResult } from '@fingerprintjs/fingerprintjs'

function App() {
  // GetResult 全体を保存するために、State の型を GetResult | null とする
  const [fingerprintResult, setFingerprintResult] = useState<GetResult | null>(null)
  const [timeTaken, setTimeTaken] = useState<number | null>(null)

  useEffect(() => {
    const startTime = performance.now()

    FingerprintJS.load()
      .then((fp: Agent) => fp.get())
      .then((result: GetResult) => {

        setFingerprintResult(result)

        const endTime = performance.now()
        const duration = endTime - startTime
        setTimeTaken(duration)
      })
      .catch((err: Error) => {
        console.error('Failed to get fingerprint:', err)
      })
  }, [])

  return (
    <div style={{ margin: '2rem' }}>
      <h1>FingerprintJS test</h1>

      <div>
        <strong>Visitor ID:</strong>{' '}
        {fingerprintResult ? fingerprintResult.visitorId : 'loading...'}
      </div>

      <div>
        <strong>Proc Time:</strong>{' '}
        {timeTaken ? `${timeTaken.toFixed(2)} ms` : '...'}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <strong>FingerprintJS GetResult (JSON):</strong>
        <pre style={{ background: '#000', padding: '1rem' }}>
          {fingerprintResult
            ? JSON.stringify(fingerprintResult, null, 2)
            : 'loading...'}
        </pre>
      </div>
    </div>
  )
}

export default App
