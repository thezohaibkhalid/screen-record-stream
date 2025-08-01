import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import {getAllVideosByUser} from "@/lib/actions/video";
import {redirect} from "next/navigation";
import EmptyState from "@/components/EmptyState";
const Page = async ({ params,searchParams }: ParamsWithSearch) => {
  const {id} = await params;
  const { query, filter } = await searchParams;

  const {user, videos, count} = await  getAllVideosByUser(id, query, filter);
  if(!user) redirect('/404')
  return (
    <div className="wrapper page">
      <Header
        subHeader={user?.email}
        title={user?.name}
        userImg={user?.image ??''}
      />
      <section className="video-grid">
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
                    title="No Videos Avaliable Yet"
                    description="Videos you upload will appear here"
                />)
        }
      </section>
    </div>
  );
};

export default Page;
