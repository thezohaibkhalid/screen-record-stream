import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
const Page = () => {
  const videos = [
    {
      id: "1",
      title: "Understanding React Hooks",
      thumbnail: "/assets/samples/thumbnail (1).png",
      createdAt: new Date("2025-05-01 12:00:00"),
      userImg: "/assets/images/zohaib.png",
      username: "Jason",
      views: 100,
      duration: 3000,
      visibility: "public",
    },
    {
      id: "2",
      title: "Intro to Node.js and Express",
      thumbnail: "/assets/samples/thumbnail (2).png",
      createdAt: new Date("2025-05-03 14:00:00"),
      userImg: "/assets/images/sara.png",
      username: "Sara",
      views: 250,
      duration: 2700,
      visibility: "public",
    },
    {
      id: "3",
      title: "Mastering Tailwind CSS",
      thumbnail: "/assets/samples/thumbnail (3).png",
      createdAt: new Date("2025-05-05 09:30:00"),
      userImg: "/assets/images/mike.png",
      username: "Mike",
      views: 320,
      duration: 1800,
      visibility: "public",
    },
    {
      id: "4",
      title: "Building REST APIs in Django",
      thumbnail: "/assets/samples/thumbnail (4).png",
      createdAt: new Date("2025-05-07 11:15:00"),
      userImg: "/assets/images/emily.png",
      username: "Emily",
      views: 480,
      duration: 2200,
      visibility: "public",
    },
    {
      id: "5",
      title: "JavaScript Async/Await Explained",
      thumbnail: "/assets/samples/thumbnail (5).png",
      createdAt: new Date("2025-05-10 08:45:00"),
      userImg: "/assets/images/ali.png",
      username: "Ali",
      views: 590,
      duration: 2400,
      visibility: "public",
    },
    {
      id: "6",
      title: "Deploying MERN Apps to Vercel",
      thumbnail: "/assets/samples/thumbnail (6).png",
      createdAt: new Date("2025-05-12 17:30:00"),
      userImg: "/assets/images/zoe.png",
      username: "Zoe",
      views: 710,
      duration: 2600,
      visibility: "public",
    },
    {
      id: "7",
      title: "Responsive Layouts with CSS Grid",
      thumbnail: "/assets/samples/thumbnail (7).png",
      createdAt: new Date("2025-05-15 10:10:00"),
      userImg: "/assets/images/oscar.png",
      username: "Oscar",
      views: 845,
      duration: 2800,
      visibility: "public",
    },
    {
      id: "8",
      title: "Next.js App Router Overview",
      thumbnail: "/assets/samples/thumbnail (8).png",
      createdAt: new Date("2025-05-18 16:20:00"),
      userImg: "/assets/images/lily.png",
      username: "Lily",
      views: 920,
      duration: 3000,
      visibility: "public",
    },
  ];

  return (
    <main className="wrapper page">
      <Header title="All Videos" subHeader="Public Library" />
      {/* <VideoCard
        id="1"
        title="Understanding React Hooks"
        thumbnail="/assets/samples/thumbnail (1).png"
        createdAt={new Date("2025-05-01 12:00:00")}
        userImg="/assets/images/zohaib.png"
        username="Jason"
        views={100}
        duration={3000}
        visibility="public"
      /> */}

      <section className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </section>
    </main>
  );
};

export default Page;
