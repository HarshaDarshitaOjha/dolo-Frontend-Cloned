import { useEffect, useState } from "react"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const handleThemeChange = () => {
      setIsLightMode(document.documentElement.classList.contains("light"))
    }

    handleThemeChange()

    window.addEventListener("scroll", handleScroll)

    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 sm:px-6">
      <nav
        className={`
          site-nav
          w-full max-w-6xl
          flex items-center justify-between
          transition-all duration-500 ease-out
          ${scrolled ? "py-3 px-6" : "py-5 px-8"}
          rounded-2xl
          backdrop-blur-2xl
          !bg-white/10
          border border-white/20
          shadow-[0_10px_50px_rgba(0,0,0,0.25)]
        `}
      >
        {/* Logo */}
        <div
          className={`h-9 sm:h-10 select-none opacity-90 hover:opacity-100 transition ${
            isLightMode ? "text-gray-900" : "text-white"
          }`}
        >
          <svg
            viewBox="0 0 400 140"
            className="h-full w-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="10"
              y="17"
              width="380"
              height="110"
              rx="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className={isLightMode ? "text-gray-800/80" : "text-white/80"}
            />

            <line
              x1="200"
              y1="35"
              x2="200"
              y2="110"
              stroke="currentColor"
              strokeWidth="3"
              className={isLightMode ? "text-gray-800/80" : "text-white/80"}
            />

            <text
              x="200"
              y="88"
              textAnchor="middle"
              fontFamily="Helvetica, Arial, sans-serif"
              fontSize="44"
              letterSpacing="6"
              fill="currentColor"
              className={`tracking-[0.3em] ${
                isLightMode ? "text-gray-900" : "text-white"
              }`}
            >
              DO LO
            </text>
          </svg>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5">
          <ThemeToggle />

          {/* Login */}
          <button
            className={`relative transition duration-300 group cursor-pointer ${
              isLightMode
                ? "text-gray-700 hover:text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            Login
            <span
              className={`absolute left-0 -bottom-1 h-[1px] w-0 transition-all duration-300 group-hover:w-full ${
                isLightMode ? "bg-black" : "bg-white"
              }`}
            />
          </button>

          {/* Get Started */}
{/* Get Started */}
<button className="relative rounded-xl overflow-hidden group cursor-pointer">
  <span
    className={`
      relative flex items-center justify-center
      px-5 py-2 rounded-xl
      text-sm font-medium
      !text-white
      transition-all duration-300
      group-hover:scale-[1.02]
      active:scale-[0.98]
      ${
        isLightMode
          ? "bg-black shadow-[0_6px_18px_rgba(0,0,0,0.25)]"
          : "bg-[rgba(255,255,255,0.08)] backdrop-blur-md shadow-[0_3px_12px_rgba(255,255,255,0.08)]"
      }
    `}
  >
    Get started
  </span>
</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar