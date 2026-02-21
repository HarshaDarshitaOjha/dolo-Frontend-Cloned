import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Preview = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const previewRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none none"
          }
        }
      )

      // Preview container animation
      gsap.fromTo(previewRef.current, 
        { opacity: 0, scale: 0.8, rotationY: 15 }, 
        { 
          opacity: 1, 
          scale: 1, 
          rotationY: 0,
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: previewRef.current,
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
    <section ref={sectionRef} className="py-32 px-8 text-center relative">

      <h2 ref={titleRef} className="text-4xl font-semibold mb-16">
        Intelligent Health Dashboard
      </h2>

      <div ref={previewRef} className="glass rounded-lg p-10 max-w-5xl mx-auto shadow-2xl">
        <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center text-gray-500">
          [ Dashboard Preview Placeholder ]
        </div>
      </div>

    </section>
  )
}

export default Preview