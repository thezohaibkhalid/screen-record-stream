"use client"
import Image from "next/image"
import { useRouter } from "next/navigation";
const VideoDetailHeader = ({title, createdAt, userImg, username, videoId, ownerId, visibility, thumbnailUrl}:VideoDetailHeaderProps)=>{
    const router = useRouter()
    return(
        <header className="detail-header">

            <aside className={"user-info"}>
                <h1>{title}</h1>
                <figure>
                    <button onClick={() => router.push(`/profile/${ownerId}`)}>
                        <Image className="rounded-full" src={userImg || ''} width={24} height={24} alt={username}/>
                    </button>
                </figure>
            </aside>
        </header>

    )
}


export  default  VideoDetailHeader;