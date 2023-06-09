import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { get } from "lodash";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import craftAPI from "@libs/api";
import { fullHomeListQuery, layoutQuery, trustQuery, easyBuyFeatureQuery, easyBuyQuery } from "@libs/queries";
import { allHomesState } from "@states/atoms/homes";
import { HomeModel, OverViewPageProps } from "@models";

import Layout from "@components/Layout/Layout";
import LeadingTrustMarkers from "@components/LeadingTrustMarkers/LeadingTrustMarkers";
import Hero from "@sections/FindHome/Hero/Hero";
import Overview from "@sections/FindHome/Overview/Overview";
import AllBenefits from "@sections/Home/AllBenefits/AllBenefits";
import HomesListing from "@sections/FindHome/HomesListing/HomesListing";

import { propsFind } from "@utils/propsFind";

const FindHome: NextPage<OverViewPageProps> = ({
  pageData,
  trustMarkers,
  listingData,
  layoutData,
  easyBuyFeature,
  easyBuy
}) => {
  const router = useRouter();
  const { query } = router;

  const [showMap, setShowMap] = useState(false);
  const heading = get(pageData, "entry.heading", "");
  const introBlurb = get(pageData, "entry.introBlurb", "");
  const globalPromos = get(pageData, "entry.globalPromos", []);
  const trustFeatures = get(trustMarkers, "globalSet.trustFeature", []);
  const homesList = get(listingData, "entries", []);
  const setHomes = useSetRecoilState(allHomesState);

  useEffect(() => {
    setHomes(homesList?.filter((el: HomeModel) => el.landOnly === false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homesList]);

  if (query?.module === "map-homes") {
    return <Overview isFullScreen />;
  }

  return (
    <Layout layoutData={layoutData}>
      <Hero
        heading={heading}
        introBlurb={introBlurb}
        showMap={showMap}
        setShowMap={setShowMap}
      />
      <HomesListing easyBuyFeature={easyBuyFeature.globalSet} setShowMap={setShowMap} showMap={showMap} />
      {showMap ? (
        <Overview />
      ) : (
        <>
          <div style={{ background: "#eef2f5" }}>
            <LeadingTrustMarkers
              features={trustFeatures}
              data={propsFind(
                globalPromos,
                "globalPromos_trustMarkers_BlockType"
              )}
            />
          </div>
          <AllBenefits
            data={easyBuy.globalSet.easyBuy[0]}
          />
        </>
      )}
    </Layout>
  );
};

const findHomesQuery = gql`
  query findHomesPage {
    entry(section: "findHomesPage") {
      ... on findHomesPage_findHomesPage_Entry {
        heading
        introBlurb
        globalPromos {
          ... on globalPromos_trustMarkers_BlockType {
            heading
            description
            hascta
            cta {
              label
              hyperlink {
                slug
              }
            }
          }
        }
      }
    }
  }
`;

export const getStaticProps = async function () {
  const pageData = await craftAPI(findHomesQuery);
  const trustMarkers = await craftAPI(trustQuery);
  const listingData = await craftAPI(fullHomeListQuery);
  const layoutData = await craftAPI(layoutQuery);
  const easyBuyFeature = await craftAPI(easyBuyFeatureQuery);
  const easyBuy = await craftAPI(easyBuyQuery);

  return {
    props: {
      pageData,
      trustMarkers,
      listingData,
      layoutData,
      easyBuyFeature,
      easyBuy
    },
    revalidate: 60,
  };
};

export default FindHome;
