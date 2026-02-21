import { useLayoutEffect, useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const HowItWorks = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const stepsRef = useRef([])
  const [isLightMode, setIsLightMode] = useState(false)

  // 🔥 Theme Detection (same as Navbar)
  useEffect(() => {
    const handleThemeChange = () => {
      setIsLightMode(document.documentElement.classList.contains("light"))
    }

    handleThemeChange()

    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    })

    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          }
        }
      )

      gsap.fromTo(
        stepsRef.current,
        { opacity: 0, y: 120, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.25,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      )

      stepsRef.current.forEach((card, i) => {
        gsap.to(card, {
          y: -10,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white/[0.03] via-transparent to-white/[0.02]" />

      {/* Blobs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-slate-400/10 blur-[130px] rounded-full -z-10" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-blue-300/8 blur-[130px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto text-center">

        {/* Title */}
        <h3
          ref={titleRef}
          className={`
            text-3xl md:text-4xl font-semibold mb-16
            bg-gradient-to-r bg-clip-text text-transparent tracking-tight
            ${
              isLightMode
                ? "from-gray-900 to-gray-600"
                : "from-white to-white/60"
            }
          `}
        >
          How It Works
        </h3>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {[
            "Upload your medical report",
            "AI analyzes key metrics",
            "Get clear visual insights"
          ].map((text, index) => (
            <div
              key={index}
              ref={(el) => (stepsRef.current[index] = el)}
              className={`
                relative group p-8 rounded-2xl
                backdrop-blur-xl
                transition-all duration-500
                ${
                  isLightMode
                    ? "bg-white border border-gray-200 hover:border-gray-400 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                    : "bg-white/[0.04] border border-white/10 hover:border-white/30 hover:shadow-[0_20px_60px_rgba(255,255,255,0.08)]"
                }
              `}
            >
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center
                              rounded-xl bg-white/5 border border-white/10">
                <span
                  className={`text-xl font-light ${
                    isLightMode ? "text-gray-700" : "text-white/70"
                  }`}
                >
                  0{index + 1}
                </span>
              </div>

              <p
                className={`text-sm md:text-base transition-colors duration-300 ${
                  isLightMode ? "text-gray-600" : "text-gray-400 group-hover:text-gray-200"
                }`}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks