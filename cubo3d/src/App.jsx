import { useState } from 'react'
import Cubo3D from './Cubo3D'
import CuboInteligente from './CuboInteligente'

function App() {
  const [modoInteligente, setModoInteligente] = useState(false)

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Cubo 3D {modoInteligente ? "Inteligente" : "Interactivo"}</h1>

      <button
        onClick={() => setModoInteligente(!modoInteligente)}
        style={{
          marginBottom: "2rem",
          padding: "10px 20px",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        Cambiar a modo {modoInteligente ? "Interactivo" : "Inteligente"}
      </button>

      {modoInteligente ? <CuboInteligente /> : <Cubo3D />}
    </div>
  )
}

export default App
