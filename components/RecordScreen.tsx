"use client"
import React, {useRef, useState} from 'react';
import Image from "next/image";
import {ICONS} from "@/constants";
import {useRouter} from "next/navigation";
import {useScreenRecording} from "@/lib/hooks/useScreenRecordingHook";

function RecordScreen() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const {isRecording, recordedBlob, recordedVideoUrl, recordingDuration, resetRecording, startRecording, stopRecording} = useScreenRecording()
    const closeModal = ()=>{
        setIsOpen(false)
        resetRecording()
    }
    const handleStart = async ()=>{
        await startRecording();
    }

    const recordAgain=async ()=>{
        resetRecording();
        await startRecording();
        if(recordedVideoUrl && videoRef.current){
            videoRef.current.src=recordedVideoUrl;
        }
    }
    const goToUpload =()=>{
        if(!recordedBlob) return;
            const url =  URL.createObjectURL(recordedBlob)
            sessionStorage.setItem('recordedVideo',
                JSON.stringify({
                url,
                    name:'screen-recording.webm',
                type: recordedBlob.type,
                size:recordedBlob.size,
                duration:recordingDuration ||0,
            })
            )
        router.push('/upload')
        closeModal();
    }
    return (
        <div className="record">
            <button className="primary-btn" onClick={()=> setIsOpen(true)}>
                <Image src={ICONS.record} alt="Record" width={16} height={16} />
                <span>Record a video</span>
            </button>

            {isOpen &&
            (
                    <section className="dialog">
                        <div className={"overlay-record"} onClick={closeModal}/>
                            <div className={"dialog-content"}>
                                <figure>
                                    <h2>
                                        Screen Recording
                                    </h2>
                                    <button onClick={closeModal}>
                                        <Image src={ICONS.close} height={20} width={20} alt={"Close Icon"}/>

                                    </button>
                                </figure>
                                <section>
                                    {isRecording ? (
                                        <article>
                                            <div/>
                                            <span>Recording is in Progress</span>

                                        </article>
                                    ): recordedVideoUrl?(
                                        <video ref={videoRef} src={recordedVideoUrl} controls/>
                                    ):(
                                        <p>Click record to start capturing your screen</p>
                                    )

                                    }
                                </section>
                                <div className={"record-box"}>
                                    {
                                        !isRecording && !recordedVideoUrl && (
                                            <button onClick={handleStart} className={"record-start"}>
                                            <Image src={ICONS.record} alt={"Record Button"} width={16} height={16} />
                                                Record
                                            </button>
                                        )
                                    }
                                    {isRecording &&(
                                        <button onClick={stopRecording} className={"record-stop"}>
                                            <Image src={ICONS.record} alt={"Record Button"} width={16} height={16} />
                                            Stop Recording

                                        </button>
                                    )}
                                    {
                                        recordedVideoUrl&&(
                                            <>
                                                <button onClick={recordAgain} className={"record-again"}>
                                                    <Image src={ICONS.record} alt={"Record Button"} width={16} height={16} />
                                                    Record Again
                                                </button>
                                                <button onClick={goToUpload} className={"record-upload"}>
                                                    <Image src={ICONS.upload} alt={"Upload"} width={16} height={16} />
                                                    Continue to Upload
                                                </button>
                                            </>
                                        )
                                    }
                                </div>
                            </div>

                    </section>

            )
            }
        </div>
    );
}

export default RecordScreen;