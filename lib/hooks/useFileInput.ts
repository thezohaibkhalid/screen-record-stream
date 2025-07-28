import { duration } from "drizzle-orm/gel-core";
import React from "react";
import {useState, useRef} from "react";

export const useFileInput = (maxSize:number)=>{
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>('');

    const [duration, setDuration] = useState<number | null>(0);
    const inputRef = useRef<HTMLInputElement | null>(null);



const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.[0]) {
        const selectedFile = e.target.files[0];
        if (selectedFile.size > maxSize) {
            alert(`File size exceeds the limit of ${maxSize / 1024 / 1024} MB`);
            return;
        }
        if(previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setFile(selectedFile);
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);
        if(selectedFile.type.startsWith('video/')) {
            const videoElement = document.createElement('video');
            videoElement.preload = 'metadata';

            videoElement.onloadedmetadata = () => {
                if(isFinite(videoElement.duration) && videoElement.duration > 0) {
                setDuration(Math.round(videoElement.duration));
            }else{
                setDuration(0);
            }
            URL.revokeObjectURL(objectUrl);
        }
        videoElement.src = objectUrl;
        
    }
}
}


const resetFile = () => {
    if(previewUrl) {
        URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setDuration(0);
    if (inputRef.current) {
        inputRef.current.value = '';
    }
}
return {
    file,
    previewUrl,
    duration,
    inputRef,
    handleFileChange,
    resetFile
}
};
