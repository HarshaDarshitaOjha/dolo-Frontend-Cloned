import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Preview from "../components/Preview"
import HowItWorks from "../components/HowItWorks"
import Disclaimer from "../components/Disclaimer"
import Footer from "../components/Footer"
import GridBackground from "../components/GridBackground"

const Landing = () => {
  useLayoutEffect(() => {
    // Hero section animation
    gsap.fromTo("#hero", 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#hero",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none"
        }
      }
    )

    // Features section animation
    gsap.fromTo("#features", 
      { opacity: 0, x: -100 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#features",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none"
        }
      }
    )

    // Preview section animation
    gsap.fromTo("#preview", 
      { opacity: 0, scale: 0.8 }, 
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: "#preview",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none"
        }
      }
    )

    // How It Works section animation
    gsap.fromTo("#how-it-works", 
      { opacity: 0, y: 100 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#how-it-works",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none"
        }
      }
    )

    // Disclaimer section animation
    gsap.fromTo("#disclaimer", 
      { opacity: 0, x: 100 }, 
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#disclaimer",
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none"
        }
      }
    )

    // Footer animation - more conservative trigger
    gsap.fromTo("#footer", 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#footer",
          start: "top 95%",
          end: "bottom 5%",
          toggleActions: "play none none none"
        }
      }
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div>
      <GridBackground />
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="preview">
        <Preview />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="disclaimer">
        <Disclaimer />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  )
}

export default Landing