import Header from "@/components/Header";

const Page = async ({ params }: ParamsWithSearch) => {
  const id = await params;
  return (
    <div className="wrapper page">
      <Header
        subHeader="zohaibkhalid.pk@gmail.com"
        title="Zohaib Kalid"
        userImg={"/assets/images/dummy.jpg"}
      />
    </div>
  );
};

export default Page;
