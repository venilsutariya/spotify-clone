"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);
    if(songs.length === 0){
        return (
            <div className="
             flex
             flex-col
             gap-y-2
             w-full
             px-6
             text-neutral-400
            ">
                No Songs Found.
            </div>
        )
    }
  return (
    <div className="
     flex
     flex-col
     gap-y-2
     w-full
     px-6
    ">
        {songs.map((songItem) => (
            <div key={songItem.id} className="flex items-center w-full gap-x-4">
                <div className=" flex-1">
                    <MediaItem 
                     onClick={(id: string) => {onPlay(id)}}
                     data={songItem}
                    />
                </div>
                <LikeButton songId={songItem.id}/>
            </div>
        ))}
    </div>
  )
}

export default SearchContent;
