import { useRef, useState, useEffect } from "react"
import "./Cubo3D.css"

export default function Cubo3D() {
  const cubeRef = useRef(null)
  const [rotation, setRotation] = useState({ x: -30, y: -45 })
  const lastPos = useRef({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [modal, setModal] = useState(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    lastPos.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const deltaX = e.clientX - lastPos.current.x
    const deltaY = e.clientY - lastPos.current.y
    setRotation((prev) => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }))
    lastPos.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const handleFaceClick = (cara) => setModal(cara)
  const closeModal = () => setModal(null)

  return (
    <>
      <div className="scene" onMouseDown={handleMouseDown}>
        <div
          ref={cubeRef}
          className="cube"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {["front", "back", "left", "right", "top", "bottom"].map((face) => (
            <div key={face} className={`face ${face}`}>
              <button onClick={() => handleFaceClick(face)}>{face}</button>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Cara: {modal.toUpperCase()}</h2>
            <p>Este es el contenido del modal de la cara "{modal}".</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  )
}
