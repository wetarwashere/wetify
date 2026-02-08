"use client"

export interface PlayerProps {
  result: SearchResults<["track"]>
  artist: SearchResults<["artist"]>
}

import { motion, AnimatePresence } from "framer-motion"
import { SearchResults } from "@spotify/web-api-ts-sdk"
import Image from "next/image"
import Metadata from "./metadata"
import { useEffect, useState } from "react"
import { FaMusic } from "react-icons/fa6"

const Player = ({ result, artist }: PlayerProps) => {
  const tracks = result.tracks?.items
  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        setShowPlayer((previous) => !previous)
      }
    }

    window.addEventListener("keydown", keyDownHandler)
    return () => window.removeEventListener("keydown", keyDownHandler)
  }, [])

  return (
    <div className="flex flex-col">
      <AnimatePresence mode="wait">
        {!showPlayer && (
          <motion.div key={tracks[0].id} initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 200, opacity: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="fixed bottom-0 right-22 flex flex-row bg-black m-4 border-white border-3" >
            <div className="flex p-5">
              <FaMusic className="text-white text-3xl mr-1 hover:text-gray-400 transition duration-150 ease-out cursor-pointer" onClick={() => setShowPlayer(true)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showPlayer && (
          <motion.div key={tracks[0].id} initial={{ x: -500, opacity: 1 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -500, opacity: 1 }} transition={{ duration: 0.7, ease: "easeOut" }} className="p-6 bg-black m-4 border-white border-3 h-max">
            <Image src={tracks[0].album.images[0].url} width={310} height={310} alt="Album image" draggable={false} className="select-none" />
            <Metadata result={result} artist={artist} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Player
