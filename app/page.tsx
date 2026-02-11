import { SpotifyApi } from "@spotify/web-api-ts-sdk"
import Player from "./components/player/player"
import Search from "./components/search"

const Home = async ({ searchParams }: { searchParams: Promise<{ query: string }> | { query: string } }) => {
  try {
    const res = SpotifyApi.withClientCredentials(process.env.SPOTIFY_CLIENT_ID!, process.env.SPOTIFY_CLIENT_SECRET!)
    const params = await searchParams
    const query = params?.query || "Everything You Are"
    const result = await res.search(query, ["track"])
    let artist = null

    if (result?.tracks?.items?.length > 0) {
      const artistSearch = await res.search(result?.tracks?.items[0]?.artists[0]?.name, ["artist"])
      artist = artistSearch?.artists?.items[0] || null
    }

    return (
      <div className="relative flex flex-row justify-between items-start h-screen w-screen">
        {result && <Player result={result} artist={artist} />}
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 h-screen -z-10 select-none">
          <h1 className="text-9xl text-white font-bold"><span className="text-green-600">Wet</span><span className="text-black">ify</span></h1>
          <h1 className="text-gray-300 font-bold text-2xl">Wetar&apos;s spotify wrapper</h1>
        </div>
        <Search />
      </div>
    )
  } catch {
    return (
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 h-screen -z-10 select-none">
        <h1 className="text-9xl text-white font-bold"><span className="text-green-600">Wet</span><span className="text-black">ify</span></h1>
        <h1 className="text-red-500 font-bold text-2xl">Error connecting to api, check your internet connection</h1>
      </div>
    )
  }
}

export default Home
