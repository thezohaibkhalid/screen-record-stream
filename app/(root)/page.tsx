import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import {getAllVideos} from "@/lib/actions/video";

import EmptyState from "@/components/EmptyState";
const Page = async ({searchParams}:SearchParams) => {
    const {query, filter, page} = await searchParams;
    const {videos} = await getAllVideos(query, filter, Number(page)||1)

    return (
        <main className="wrapper page">
            <Header title="All Videos" subHeader="Public Library" />


            {videos.length>0 ?
                (
                    <section className="video-grid">

                        {videos.map(({ video, user }) => (
                            <VideoCard
                                key={video.id}
                                id={video.videoId}
                                title={video.title}
                                thumbnail={video.thumbnailUrl}
                                createdAt={video.createdAt}
                                userImg={user?.image ?? ""}
                                username={user?.name ?? "Guest"}
                                views={video.views}
                                visibility={video.visibility}
                                duration={video.duration}
                            />
                        ))}


                    </section>
                ):(
                    <EmptyState
                        icon="/assets/icons/video.svg"
                        title="No Videos Found"
                        description="Try adjusting your search."
                    />)
            }

        </main>
    );
};

export default Page;
