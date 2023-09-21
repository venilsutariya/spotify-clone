"use client";

import PlayerContent from "@/app/liked/PlayerContent";
import useGetSongByid from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongByid(player.activeId);

    const songUrl = useLoadSongUrl(song!);

    if(!song || !songUrl || !player.activeId){
        return null;
    }
    return (
        <div
         className="
          fixed
          bottom-0
          bg-black
          w-full
          py-2
          h-[80-px]
          px-4
         ">
            <PlayerContent
             key={songUrl}
             song={song}
             songUrl={songUrl}
            />
        </div>
    )
}

export default Player;
