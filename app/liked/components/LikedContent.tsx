"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
    songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {
    const router = useRouter();
    const { isLoading , user} = useUser();
    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if(!isLoading && !user){
            router.replace('/');
        }
    }, [isLoading , user , router])

    if(songs.length === 0){
        return (
            <div className="flex flex-col px-6 w-full gap-y-2 text-neutral-400">
                No Liked Songs.
            </div>
        )
    }
  return (
    <div className=" flex flex-col w-full p-6 gap-y-2 ">
        {songs.map((item) => (
            <div
            key={item.id}
            className="
             flex items-center gap-x-4 w-full
            ">
                <div className="flex-1">
                    <MediaItem 
                     onClick={(id: string) => onPlay(id)}
                     data={item}
                    />
                </div>
                <LikeButton songId={item.id}/>
            </div>
        ))}
    </div>
  )
}

export default LikedContent;
