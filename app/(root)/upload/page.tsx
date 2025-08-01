"use client";
import React, {ChangeEvent, useEffect, useState} from "react";
import FormField from "@/components/FormField";
import FileInput from "@/components/FileInput";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import {getVideoUploadUrl, getThumbnailUploadUrl, saveVideoDetails} from "@/lib/actions/video";
import {useRouter} from "next/navigation";
const uploadFileToBunny = (file: File, uploadUrl:string, accessKey:string)=> {
  return fetch(uploadUrl, {
    method:"PUT",
    headers:{
      "Content-Type": "file.type",
      AccessKey:accessKey,
    },
    body:file,
  }).then((response)=>{
    if (!response.ok) {
      throw new Error(response.statusText + "Upload Failed");
    }
  })
}
const page =  () => {
  const [error, setError] = useState<string | null>('');
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
    // tags: "",
    // thumbnail: null,
    // videoFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const router  = useRouter();
  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  useEffect(() => {
    if (video.duration !== null && video.duration !== 0) {
      setVideoDuration(video.duration);
    }
  }, [video.duration]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        if(!video.file || !thumbnail.file) {
          setError("Please upload both video and thumbnail files.");
          setIsSubmitting(false);
          return;
        }
        if(!formData.title || !formData.description) {
          setError("Title and description are required.");
          setIsSubmitting(false);
          return;
        }

        //---------1------Getting upload credentials
      //Video Credentials
      const {
          videoId,
        uploadUrl:videoUploadUrl,
        accessKey:videoAccessKey
        } = await getVideoUploadUrl()
      //Thumbnails Credentials
      const  {
          cdnUrl:thumbnailCdnUrl,
          uploadUrl:thumbnailUploadUrl,
          accessKey:thumbnailAccessKey
      } = await getThumbnailUploadUrl(videoId)

      //---------2------Verify that we have the credentials for Upload
      //For Video
      if(!videoUploadUrl|| !videoAccessKey) throw new Error("Failed to get Video Upload Credentials");
      //For Thumbnail
       if(!thumbnailCdnUrl || !thumbnailUploadUrl || !thumbnailAccessKey) throw new Error("Failed to get Thumbnail Upload Credentials");

      //---------3------Upload the Video to Bunny
      await uploadFileToBunny(video.file, videoUploadUrl,videoAccessKey )
      //---------4------Upload the Thumbnail to Database and Attach it with Video
      await uploadFileToBunny(thumbnail.file, thumbnailUploadUrl, thumbnailAccessKey)

      //---------5------Create a new Final DB entry for the video details (url, data)
      await saveVideoDetails({
        videoId,
        thumbnailUrl: thumbnailCdnUrl,
        duration: videoDuration,
        ...formData,
      })
      router.push(`/video/${videoId}`)

        setError(null);
    } catch (error) {
      console.error("Error uploading video:", error);
      setError("Failed to upload video. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="wrapper-md page upload-page">
      <h1>Upload a Video</h1>
      {error && <div className="error-field">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5"
      >
        <FormField
          id="title"
          label="Title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter a clear and descriptive title"
        />
        <FormField
          id="description"
          label="Description"
          type="textarea"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Provide a detailed description of your video"
          as="textarea"
        />
        <FileInput
          id="video"
          label="Video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type="video"
        />
        <FileInput
          id="thumbnail"
          label="Thumbnail"
          accept="image/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type="image"
        />
        <FormField
          id="visibility"
          label="Visibility"
          type="select"
          value={formData.visibility}
          onChange={handleInputChange}
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
          as="select"
        />
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default page;
