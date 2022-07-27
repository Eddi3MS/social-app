import { Feed, Head } from "../../components";

const Home = () => {
  return (
    <section className="app_container main_container">
      <Head title="Home" description="Social App - Home Page" />
      <Feed />
    </section>
  );
};

export default Home;
