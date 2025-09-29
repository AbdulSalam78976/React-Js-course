import { useCallback, useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(12)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')

  // use Ref
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let password = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    
    if (includeNumbers) {
      str += '0123456789'
    }
    if (includeSymbols) {
      str += '!@#$%^&*'
    }
    
    for (let i = 0; i < length; i++) {
      // Fixed: Generate random index between 0 and str.length - 1
      let charIndex = Math.floor(Math.random() * str.length)
      password += str.charAt(charIndex)
    }
    setPassword(password)
  }, [length, includeNumbers, includeSymbols])

  // Fixed: Proper useCallback implementation
  const handleGeneratePassword = useCallback(() => {
    generatePassword()
  }, [generatePassword])

  useEffect(() => {
    handleGeneratePassword()
  }, [handleGeneratePassword])

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select()
      
      navigator.clipboard.writeText(password)
      alert('Password copied to clipboard!')
    }
  }

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="generator">
        <div className="password-display">
          <input 
            ref={passwordRef}
            type="text" 
            readOnly
            value={password} 
          />
          <button onClick={copyToClipboard}>copy</button>
        </div>
        
        <div className="settings">
          <div className="setting-item">
            <label htmlFor="length">
              Password Length: <span>{length}</span>
            </label>
            <input 
              type="range" 
              id="length" 
              min="6" 
              max="20" 
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>

          <div className="setting-item">
            <label htmlFor="numbers">
              Include Numbers
              <input 
                type="checkbox" 
                id="numbers" 
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
            </label>
          </div>

          <div className="setting-item">
            <label htmlFor="symbols">
              Include Symbols
              <input 
                type="checkbox" 
                id="symbols" 
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App