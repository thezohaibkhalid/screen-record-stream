"use client"
import Image from "next/image"
import { useRouter } from "next/navigation";
import {daysAgo} from "@/lib/utils";
import {useEffect, useState} from "react";
const VideoDetailHeader = ({title, createdAt, userImg, username, videoId, ownerId, visibility, thumbnailUrl}:VideoDetailHeaderProps)=>{
    const router = useRouter()
    const [copied, setCopied] = useState(false)

    const handleCopyLink = ()=>{
        navigator.clipboard.writeText(`${window.location.origin}/video/${videoId}`)
        setCopied(true)
    }
    useEffect(() => {
       const changeChecked =  setTimeout(()=>{
            if(copied) setCopied(false)
        }, 2000)
        return ()=> clearTimeout(changeChecked)
    }, [copied]);
    return(
        <header className="detail-header">

            <aside className={"user-info"}>
                <h1>{title}</h1>
                <figure>
                    <button onClick={() => router.push(`/profile/${ownerId}`)}>
                        <Image className="rounded-full" src={userImg || ''} width={24} height={24} alt={'username'}/>
                        <h2>{username || "Guest"}</h2>
                    </button>
                    <figcaption>
                        <span className={"mt-1"}>-</span>
                        <p>{daysAgo(createdAt)}</p>
                    </figcaption>

                </figure>
            </aside>

            <aside className="cta">
                <button onClick={handleCopyLink}>
                    <Image
                        src={
                            copied ? "/assets/images/checked.png" : "/assets/icons/link.svg"
                        }
                        alt="Copy Link"
                        width={24}
                        height={24}
                    />
                </button>
            </aside>
        </header>

    )
}


export  default  VideoDetailHeader;