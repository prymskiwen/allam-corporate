import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "@components/Layout/Layout";
import Hero from "@sections/FindEstateDetail/Hero/Hero";
import BannerGallery from "@sections/FindEstateDetail/BannerGallery/BannerGallery";
import LeadingInfo from "@sections/FindEstateDetail/LeadingInfo/LeadingInfo";
import HomeList from "@sections/FindEstateDetail/HomeList/HomeList";
import MasterPlan from "@sections/FindEstateDetail/MasterPlan/MasterPlan";
import Deposit from "@sections/FindEstateDetail/Deposit/Deposit";
import News from "@sections/FindEstateDetail/News/News";
import SimilarEstates from "@sections/FindEstateDetail/SimilarEstates/SimilarEstates";

const FindEstateDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Hero />
      <BannerGallery />
      <LeadingInfo />
      <HomeList />
      <MasterPlan />
      <Deposit />
      <News />
      <SimilarEstates />
    </Layout>
  );
};

export default FindEstateDetail;
