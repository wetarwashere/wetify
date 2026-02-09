"use client"

import { FaMusic, FaPencil, FaCalendarDay, FaHeart, FaUser } from "react-icons/fa6"
import { PlayerProps } from "./player"
import { capitalizeEach } from "../../utils/capitalize"
import Link from "next/link"

const Metadata = ({ result, artist }: PlayerProps) => {
  const tracks = result?.tracks?.items
  const genres = artist?.artists?.items[0]?.genres

  return (
    <div className="p-4 bg-gray-800 flex flex-col gap-4 min-w-70">
      <div className="flex flex-row items-start justify-start gap-3">
        <FaMusic className="text-white size-6 mt-2 shrink-0" />
        <Link target="_blank" href={tracks[0]?.external_urls?.spotify} className="text-2xl font-bold text-white max-w-70 underline-offset-3 truncate underline hover:text-gray-300 transition duration-150 ease-out cursor-pointer">
          {tracks[0]?.name}
        </Link>
      </div>
      <div className="flex flex-row items-start justify-start gap-3">
        <FaPencil className="text-white size-6 mt-1 shrink-0" />
        <Link target="_blank" href={tracks[0]?.album?.external_urls?.spotify} className="text-2xl font-bold text-white max-w-70 truncate hover:text-gray-300 transition duration-150 ease-out cursor-pointer">
          {tracks[0]?.album?.name}
        </Link>
      </div>
      <div className="flex flex-row justify-start items-start gap-3">
        <FaCalendarDay className="text-white size-6 mt-1 shrink-0" />
        <Link target="_blank" href={`https://en.wikipedia.org/wiki/${tracks[0]?.album?.release_date?.split("-")[0]}`} className="text-2xl flex flex-col font-bold text-white hover:text-gray-300 transition duration-150 ease-out max-w-70 truncate">
          {tracks[0]?.album?.release_date?.split("-")[0]}
        </Link>
      </div>
      {genres && genres?.length > 0 ? (
        <div className="flex flex-row items-start justify-start gap-3">
          <FaHeart className="text-white size-6 mt-1 shrink-0" />
          <h1 className="text-2xl flex flex-col font-bold text-white max-w-70 wrap-break-word">
            {artist?.artists?.items[0]?.genres?.map((genre, index) => (
              <Link target="_blank" href={`https://google.com/search?q=${genre} genre`} key={index} className="hover:text-gray-300 transition duration-150 ease-out max-w-70 truncate cursor-pointer">
                {capitalizeEach(genre)}
              </Link>
            ))}
          </h1>
        </div>
      ) : (
        <div className="flex flex-row items-start justify-start gap-3">
          <FaHeart className="text-white size-6 mt-1 shrink-0" />
          <h1 className="text-2xl flex flex-col font-bold text-white max-w-70 truncate">
            No Genres Found
          </h1>
        </div>
      )}
      <div className="flex flex-row items-start gap-3">
        <FaUser className="text-white text-2xl mt-1 shrink-0" />
        <h1 className="text-2xl flex flex-col font-bold text-white wrap-break-word">
          {tracks[0]?.artists?.map((artist, index) => (
            <Link target="_blank" href={artist.external_urls.spotify} key={index} className="hover:text-gray-300 transition duration-150 ease-out max-w-70 truncate cursor-pointer">{artist.name}</Link>
          ))}
        </h1>
      </div>
    </div >
  )
}

export default Metadata
