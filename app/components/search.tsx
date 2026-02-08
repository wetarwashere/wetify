"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { capitalize } from "../utils/capitalize"

const Search = () => {
  const [input, setInput] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const handleSearch = () => {
    if (input.trim()) {
      router.push(`/?query=${encodeURIComponent(input)}`)
      setInput("")
      setShowSearch(false)
    }
  }

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showSearch])

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSearch((previous) => !previous)
      }
    }

    window.addEventListener("keydown", keyDownHandler)
    return () => window.removeEventListener("keydown", keyDownHandler)
  })

  return (
    <div className="flex flex-row justify-center items-center">
      <AnimatePresence mode="wait">
        {!showSearch && (
          <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 200, opacity: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="fixed bottom-0 right-0 flex flex-row bg-black m-4 border-white border-3" >
            <div className="flex p-5">
              <FaMagnifyingGlass className="text-white text-3xl hover:text-gray-400 ease-out transition duration-150 cursor-pointer" onClick={() => setShowSearch(true)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showSearch && (
          <motion.div initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -200, opacity: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="flex justify-between items-center bg-white m-4">
            <input type="text" value={input} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(capitalize(event.target.value))} ref={inputRef} onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && handleSearch} placeholder="Input a song name" className="border-white border-3 outline-none bg-black text-white text-2xl p-3 font-bold" />
            <FaMagnifyingGlass className="text-black text-3xl mx-5 hover:text-gray-500 transition duration-150 ease-out cursor-pointer" onClick={handleSearch} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Search
