import type { NextPage } from "next";
import Layout from "@components/Layout/Layout";
import Hero from "@sections/Home/Hero/Hero";
import TrustMakers from "@sections/Home/TrustMakers/TrustMakers";
import Monterey from "@sections/Home/Monterey/Monterey";
import FindHomes from "@sections/Home/FindHomes/FindHomes";

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <TrustMakers />
      <Monterey />
      <FindHomes />
    </Layout>
  );
};

export default Home;
