import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Footer = () => {
  const footerRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current, 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 98%",
            end: "bottom 2%",
            toggleActions: "play none none none"
          }
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="border-t border-white/10 py-10 text-center text-gray-500">
      © 2026 DOLO · Built by Hacktivists
    </footer>
  )
}

export default Footer