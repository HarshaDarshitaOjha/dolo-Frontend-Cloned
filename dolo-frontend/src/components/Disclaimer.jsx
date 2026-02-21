import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Disclaimer = () => {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none none"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 text-center text-gray-500 max-w-3xl mx-auto px-6">
      Dolo is not a diagnostic tool. All insights are AI-generated
      for educational purposes only. Always consult a certified
      healthcare professional.
    </section>
  )
}

export default Disclaimer