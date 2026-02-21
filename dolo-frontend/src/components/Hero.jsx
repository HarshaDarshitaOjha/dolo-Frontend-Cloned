import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Typewriter from "typewriter-effect"

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered animation for hero content
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none"
        }
      })

      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(descriptionRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 
        "-=0.4"
      )
      .fromTo(buttonRef.current, 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, 
        "-=0.3"
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">

      {/* Content */}
      <div className="relative z-10 max-w-4xl">

        <h1 ref={titleRef} className="text-5xl md:text-6xl font-playfair font-medium leading-[1.05] tracking-[-0.01em] text-white text-center"> 
          Decode Your Medical Reports

          <span className="block mt-2 text-gray-400">
            <span className="inline-flex items-baseline justify-center">
              
              <span className="mr-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;With AI </span>

              <span className="min-w-[10ch] text-left">
                <Typewriter
                  options={{
                    strings: ["Precision", "Accuracy"],
                    autoStart: true,
                    loop: true,
                    delay: 70,
                    deleteSpeed: 40,
                    pauseFor: 1500,
                    cursor: "|",
                  }}
                />
              </span>

            </span>
          </span>
        </h1>

        <p ref={descriptionRef} className="mt-6 text-gray-400 max-w-2xl mx-auto text-base md:text-md leading-relaxed">
          Upload your blood test or medical report and receive a clear,
          visual explanation instantly — simplified for real understanding.
        </p>

        {/* Single Button */}
        <div className="mt-8 flex justify-center">
          <button
            ref={buttonRef}
            className="
              px-6 py-2.5
              text-sm
              rounded-lg
              border border-white/20
              text-white
              hover:bg-white/10
              transition
              cursor-pointer
              theme-border
            "
          >
            Upload Report
          </button>
        </div>

      </div>
    </section>
  )
}

export default Hero