import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)



  return (
    <>

      <h1>Creatorverse</h1>
      <Link to={`creators`}>
        <button>View all creators</button>
      </Link>

      <Link to={`/add`}>
        <button>Add a creator</button>
      </Link>
    </>
  )
}

export default App
