import { useEffect, useRef } from "react"

const GridBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    let width, height
    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height)

      // Set line properties based on theme
      const isLightMode = document.documentElement.classList.contains('light')
      ctx.strokeStyle = isLightMode 
        ? 'rgba(0, 0, 0, 0.08)' // Elegant gray lines for light mode
        : 'rgba(255, 255, 255, 0.12)' // White lines for dark mode
      ctx.lineWidth = 1

      // Draw vertical lines
      const lineSpacing = 80 // Space between lines in pixels
      for (let x = 0; x < width; x += lineSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
    }

    drawGrid() // Initial draw

    // Redraw on resize
    const handleResize = () => {
      resize()
      drawGrid()
    }

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      drawGrid()
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}

export default GridBackground