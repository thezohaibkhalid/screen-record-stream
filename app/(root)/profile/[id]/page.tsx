import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
const Page = async ({ params }: ParamsWithSearch) => {
  const id = await params;

  const videos = [
    {
      id: "1",
      title: "Understanding React Hooks",
      thumbnail: "/assets/samples/thumbnail (1).png",
      createdAt: new Date("2025-05-01 12:00:00"),
      userImg: "/assets/images/jason.png",
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
  ];
  return (
    <div className="wrapper page">
      <Header
        subHeader="zohaibkhalid.pk@gmail.com"
        title="Zohaib Kalid"
        userImg={"/assets/images/dummy.jpg"}
      />
      <section className="video-grid">
        {videos.map((video) => (
          <VideoCard {...video} />
        ))}
      </section>
    </div>
  );
};

export default Page;
