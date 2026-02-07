"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const Help = () => {
  const texts = [
    "Ctrl to show or hide Player",
    "Escape to show or hide Search Bar"
  ]
  const [change, setChange] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setChange(previous => (previous + 1) % texts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <div className="flex flex-row select-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div key={change} initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 200, opacity: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="fixed bottom-0 right-46 flex flex-row bg-black m-4 border-white border-3" >
            <div className="flex p-4">
              <h1 className="text-white hover:text-gray-400 cursor-pointer ease-out transition duration-150 text-2xl font-bold" onClick={() => setIsVisible(false)}>{texts[change]}</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Help
