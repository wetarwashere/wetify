import { SpotifyApi } from "@spotify/web-api-ts-sdk"
import Player from "./components/player/player"
import Search from "./components/search"
import Help from "./components/help"

const Home = async ({ searchParams }: { searchParams: Promise<{ query?: string }> | { query?: string } }) => {
  const res = SpotifyApi.withClientCredentials(process.env.SPOTIFY_CLIENT_ID!, process.env.SPOTIFY_CLIENT_SECRET!)
  const params = await searchParams
  const query = params?.query || "Mortals"
  const result = await res.search(query, ["track"])
  const artist = await res.search(result?.tracks?.items[0]?.artists[0]?.name, ["artist"])

  return (
    <div className="flex justify-between items-start h-screen w-screen">
      <Player result={result} artist={artist} />
      <Help />
      <Search />
    </div>
  )
}

export default Home
