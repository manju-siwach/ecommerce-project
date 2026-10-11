
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, useNavigate } from 'react-router'
// import Footer from './Components/Footer'



function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  const handle = () => {
    navigate("/Login")
  }

  return (
    <>
      <div>

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>ffffffff</h1>
      <h1>React </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={handle}>click to navigate login</button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more hnbbjhkjasgnakjh
      </p>

    </>
  )
}

export default App
