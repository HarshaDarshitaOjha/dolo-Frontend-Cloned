import { useEffect, useRef, useState } from "react"

const Features = () => {
  const sectionRef = useRef(null)
  const boxRef = useRef(null)
  const cardsRef = useRef([])
  const [isLightMode, setIsLightMode] = useState(false)

  useEffect(() => {
    let currentProgress = 0
    let targetProgress = 0
    let animationFrame

    const updateScrollProgress = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const start = windowHeight
      const end = windowHeight / 2

      let progress = (start - rect.top) / (start - end)
      progress = Math.max(0, Math.min(progress, 1))

      targetProgress = progress
    }

    const animate = () => {
      currentProgress += (targetProgress - currentProgress) * 0.06

      const scale = 0.4 + currentProgress * 0.6
      const radius = 24 - currentProgress * 18

      if (boxRef.current) {
        boxRef.current.style.transform = `scale(${scale})`
        boxRef.current.style.borderRadius = `${radius}px`
      }

      animationFrame = requestAnimationFrame(animate)
    }

    const floatCards = () => {
      cardsRef.current.forEach((card, i) => {
        let offset = Math.random() * 10

        const float = () => {
          offset += 0.02
          const y = Math.sin(offset + i) * 14
          if (card) card.style.transform = `translateY(${y}px)`
          requestAnimationFrame(float)
        }

        float()
      })
    }

    // 🔥 Theme Detection (same as Navbar)
    const handleThemeChange = () => {
      setIsLightMode(document.documentElement.classList.contains("light"))
    }

    handleThemeChange()

    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    })

    window.addEventListener("scroll", updateScrollProgress)
    animate()
    floatCards()

    return () => {
      window.removeEventListener("scroll", updateScrollProgress)
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-0 flex justify-center px-6"
    >
      <div
        ref={boxRef}
        className={`
          relative w-full max-w-6xl
          backdrop-blur-2xl
          overflow-hidden
          ${isLightMode
            ? "bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-gray-200"
            : "bg-white/[0.05] shadow-[0_20px_80px_rgba(0,0,0,0.6)] border border-white/10"
          }
        `}
        style={{
          transformOrigin: "center center",
          willChange: "transform, border-radius"
        }}
      >
        {/* Subtle Bluish-Gray Blobs */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-slate-400/10 blur-[130px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-blue-300/8 blur-[130px] rounded-full" />

        <div className="py-28 px-12 relative z-10">
          
          {/* Title */}
          <h2
            className={`
              text-3xl md:text-4xl text-center mb-24 font-semibold tracking-tight
              bg-gradient-to-r bg-clip-text text-transparent
              ${isLightMode
                ? "from-gray-900 to-gray-600"
                : "from-white to-white/60"
              }
            `}
          >
            Features That Make a Difference
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "AI Extraction",
                text: "Extracts hemoglobin, platelet count, sugar levels & more."
              },
              {
                title: "Visual Insights",
                text: "Interactive graphs with healthy range indicators."
              },
              {
                title: "Simple Explanations",
                text: "No medical jargon. Just understandable summaries."
              }
            ].map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`
                  relative p-10 rounded-2xl backdrop-blur-xl
                  ${isLightMode
                    ? "bg-white border border-gray-200"
                    : "bg-white/[0.04] border border-white/10"
                  }
                `}
                style={{ willChange: "transform" }}
              >
                <h3
                  className={`text-xl mb-4 ${
                    isLightMode ? "text-gray-900" : "text-white/90"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`${
                    isLightMode ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features