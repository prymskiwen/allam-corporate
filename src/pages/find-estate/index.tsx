import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { get, map, sortBy } from "lodash";
import { useSetRecoilState } from "recoil";
import { gql } from "@apollo/client";
import { OverViewPageProps } from "@models";
import craftAPI from "@libs/api";
import { layoutQuery, trustQuery } from "@libs/queries";
import { allEstateState } from "@states/atoms/estates";
import Hero from "@sections/FindEstate/Hero/Hero";
import Overview from "@sections/FindEstate/Overview/Overview";
import AllBenefits from "@sections/Home/AllBenefits/AllBenefits";
import EstateListing from "@sections/FindEstate/EstateListing/EstateListing";
import Layout from "@components/Layout/Layout";
import LeadingTrustMakers from "@components/LeadingTrustMakers/LeadingTrustMakers";
import { propsFind } from "@utils/propsFind";
import { getSuburbs } from "@utils/getSuburbs";

const FindEstate: NextPage<OverViewPageProps> = ({
  pageData,
  trustMakers,
  listingData,
  layoutData,
}) => {
  const [showMap, setShowMap] = useState(false);
  const [suburbList, setSuburbList] = useState<string[]>([]);
  const heading = get(pageData, "entry.heading", "");
  const introBlurb = get(pageData, "entry.introBlurb", "");
  const globalPromos = get(pageData, "entry.globalPromos", []);
  const trustFeatures = get(trustMakers, "globalSet.trustFeature", []);
  const setEstates = useSetRecoilState(allEstateState);

  useEffect(() => {
    const estateList = get(listingData, "entries", []);
    setEstates(estateList);
    setSuburbList(getSuburbs(estateList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingData]);

  return (
    <Layout layoutData={layoutData}>
      <Hero
        heading={heading}
        introBlurb={introBlurb}
        setShowMap={setShowMap}
        showMap={showMap}
        suburbList={suburbList}
      />
      {showMap ? (
        <Overview />
      ) : (
        <>
          <EstateListing />
          <div style={{ background: "#eef2f5" }}>
            <LeadingTrustMakers
              features={trustFeatures}
              data={propsFind(
                globalPromos,
                "globalPromos_trustMakers_BlockType"
              )}
            />
          </div>
          <AllBenefits
            data={propsFind(globalPromos, "globalPromos_easybuy_BlockType")}
          />
        </>
      )}
    </Layout>
  );
};

const pageQuery = gql`
  query estatePage {
    entry(section: "findEstatePage") {
      ... on findEstatePage_findEstatePage_Entry {
        heading
        introBlurb
        globalPromos {
          ... on globalPromos_trustMakers_BlockType {
            heading
            description
            hascta
            cta {
              label
              link
            }
          }
          ... on globalPromos_easybuy_BlockType {
            headingRedactor
            introBlurb
            buttons {
              ... on buttons_BlockType {
                buttonLabel
                buttonLink
                buttonType
              }
            }
            cta {
              label
              link
            }
          }
        }
      }
    }
  }
`;

const estatesQuery = gql`
  query estatesQuery {
    entries(section: "estates") {
      ... on estates_default_Entry {
        slug
        title
        introText
        streetAddress
        estateState(label: true)
        estateStatus
        retirementLiving
        logo {
          title
          url
          width
          height
        }
        postcode
        suburb
        latitude
        longitude
        geojson
        downloadableBrochure {
          url
        }
        masterPlanImage {
          url
        }
        galleryImages {
          title
          url
          width
          height
        }
        offersLink {
          ... on offersLink_BlockType {
            internalOffer {
              ... on promotions_default_Entry {
                title
                shortDescription
                introBlurb
                description
              }
            }
          }
        }
      }
    }
  }
`;

export const getStaticProps = async function () {
  const pageData = await craftAPI(pageQuery);
  const trustMakers = await craftAPI(trustQuery);
  const listingData = await craftAPI(estatesQuery);
  const layoutData = await craftAPI(layoutQuery);

  return {
    props: {
      pageData,
      trustMakers,
      listingData,
      layoutData,
    },
    revalidate: 60,
  };
};

export default FindEstate;
