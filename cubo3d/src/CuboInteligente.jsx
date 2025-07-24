import { useRef, useState, useEffect } from "react"
import "./CuboInteligente.css"

const FACES = {
  front: { x: 0, y: 0 },
  back: { x: 0, y: 180 },
  right: { x: 0, y: 90 },
  left: { x: 0, y: -90 },
  top: { x: -90, y: 0 },
  bottom: { x: 90, y: 0 }
}

function getClosestFace(rotation) {
  let minDiff = Infinity
  let closest = null
  for (const [face, rot] of Object.entries(FACES)) {
    const diff = Math.hypot(rot.x - rotation.x, rot.y - rotation.y)
    if (diff < minDiff) {
      minDiff = diff
      closest = face
    }
  }
  return closest
}

export default function CuboInteligente() {
  const [rotation, setRotation] = useState({ x: -30, y: -45 })
  const [isDragging, setIsDragging] = useState(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const animRef = useRef()

  const handleMouseDown = (e) => {
    setIsDragging(true)
    lastPos.current = { x: e.clientX, y: e.clientY }
  }

const handleMouseMove = (e) => {
  if (!isDragging) return
  const dx = e.clientX - lastPos.current.x
  const dy = e.clientY - lastPos.current.y
  setRotation((prev) => ({
    x: prev.x - dy * 0.5,
    y: prev.y + dx * 0.5
  }))
  lastPos.current = { x: e.clientX, y: e.clientY }

  // reinicia el timer de inactividad
  clearTimeout(inactivityTimer.current)
  inactivityTimer.current = setTimeout(() => {
    const closest = getClosestFace(rotation)
    animateToFace(FACES[closest])
  }, 800)
}

  const handleMouseUp = () => {
    setIsDragging(false)
    const closest = getClosestFace(rotation)
    animateToFace(FACES[closest])
  }

  const animateToFace = (target) => {
    cancelAnimationFrame(animRef.current)
    const step = () => {
      setRotation((prev) => {
        const diffX = target.x - prev.x
        const diffY = target.y - prev.y
        const done = Math.abs(diffX) < 1 && Math.abs(diffY) < 1
        if (done) return target
        return {
          x: prev.x + diffX * 0.1,
          y: prev.y + diffY * 0.1
        }
      })
      animRef.current = requestAnimationFrame(step)
    }
    step()
  }

  const handleFaceClick = (face) => {
    animateToFace(FACES[face])
    // Aquí puedes abrir un modal, redirigir, etc.
    alert(`Seleccionaste la cara: ${face.toUpperCase()}`)
  }

   const inactivityTimer = useRef(null)

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      clearTimeout(inactivityTimer.current)
    }
  }, [isDragging, rotation])

 


  return (
    <div className="scene" onMouseDown={handleMouseDown}>
      <div
        className="cube"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        {Object.keys(FACES).map((face) => (
          <div key={face} className={`face ${face}`}>
            <button onClick={() => handleFaceClick(face)}>{face}</button>
          </div>
        ))}
      </div>
    </div>
  )
}
