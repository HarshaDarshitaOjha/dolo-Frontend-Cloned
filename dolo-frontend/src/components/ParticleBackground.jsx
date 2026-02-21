import { useEffect, useRef } from "react"

const ParticleBackground = () => {
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

    const mouse = { x: width / 2, y: height / 2 }

    const smooth = {
      x: mouse.x,
      y: mouse.y,
      vx: 0,
      vy: 0
    }

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    })

    const baseRadius = 160
    const points = 100

    const offsets = Array.from({ length: points }, () => ({
      value: 0,
      velocity: 0
    }))

    let lastTime = performance.now()

    const animate = (now) => {
      const dt = (now - lastTime) / 16.666
      lastTime = now

      ctx.clearRect(0, 0, width, height)

      // -------- ULTRA HEAVY LAG --------
      const followStrength = 0.008   // VERY slow
      const dampingCenter = 0.95     // glide more

      smooth.vx += (mouse.x - smooth.x) * followStrength
      smooth.vy += (mouse.y - smooth.y) * followStrength

      smooth.vx *= dampingCenter
      smooth.vy *= dampingCenter

      // Cap velocity to avoid snapping
      const maxVel = 4
      smooth.vx = Math.max(-maxVel, Math.min(maxVel, smooth.vx))
      smooth.vy = Math.max(-maxVel, Math.min(maxVel, smooth.vy))

      smooth.x += smooth.vx * dt
      smooth.y += smooth.vy * dt
      // ---------------------------------

      const velocityMagnitude = Math.hypot(smooth.vx, smooth.vy)
      const movementAngle = Math.atan2(smooth.vy, smooth.vx)

      ctx.beginPath()

      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2

        // subtle stretch
        let stretch = 0
        if (velocityMagnitude > 0.5) {
          let diff = angle - movementAngle
          diff = Math.atan2(Math.sin(diff), Math.cos(diff))

          stretch =
            Math.exp(-(diff * diff) / 1.5) *
            velocityMagnitude * 2
        }

        const breathing =
          Math.sin(now * 0.0008 + angle * 2) * 4

        const target = breathing + stretch

        const stiffness = 0.06
        const damping = 0.9

        offsets[i].velocity +=
          (target - offsets[i].value) *
          stiffness * dt

        offsets[i].velocity *= damping
        offsets[i].value += offsets[i].velocity * dt

        const radius = baseRadius + offsets[i].value

        const x = smooth.x + Math.cos(angle) * radius
        const y = smooth.y + Math.sin(angle) * radius

        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.closePath()

      // -------- SUBTLE COLOR --------
      const gradient = ctx.createRadialGradient(
        smooth.x,
        smooth.y,
        0,
        smooth.x,
        smooth.y,
        baseRadius * 1.8
      )

      gradient.addColorStop(0, "rgba(200,200,200,0.10)")
      gradient.addColorStop(1, "rgba(200,200,200,0)")

      ctx.fillStyle = gradient
      ctx.fill()

      ctx.strokeStyle = "rgba(180,180,180,0.18)"
      ctx.lineWidth = 1
      ctx.stroke()
      // --------------------------------

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
    />
  )
}

export default ParticleBackground