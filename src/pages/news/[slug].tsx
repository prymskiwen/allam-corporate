import React from "react";
import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
import { get } from "lodash";
import { gql } from "@apollo/client";
import craftAPI from "@libs/api";
import { layoutQuery } from "@libs/queries";
import Layout from "@components/Layout/Layout";
import Hero from "@sections/News/Detail/Hero/Hero";
import DetailContent from "@sections/News/Detail/DetailContent/DetailContent";
import KnowMoreAllamHomes from "@sections/News/Detail/KnowMoreAllamHomes/KnowMoreAllamHomes";

const NewsDetail: NextPage<any> = ({ newsDetail, layoutData }) => {
  const news = {
    title:
      "<h3>Allam signs national deal with Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>",
    date: "12 September 2021",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat mattis vel id sociis diam id congue amet. Aliquam porttitor auctor amet, pretium sapien posuere non. Massa mi aenean urna eu. Sit libero, tortor amet cursus. Interdum sed vitae, odio est pretium velit duis. Quis velit quis neque, lorem nulla commodo. Praesent imperdiet in diam dictum. Rutrum sit viverra commodo nunc, eget. Turpis ornare viverra nunc egestas eu, nisi, pretium risus.</p><p>Eeww non. Massa mi aenean urna eu. Sit libero, tortor amet cursus. Interdum sed vitae, odio est pretium velit duis. Quis velit quis nEeww non. Massa mi aenean urna eu. Sit libero, tortor amet cursus. Interdum sed vitae, odio est pretium velit duis. Quis velit quis n</p><br/><br/><br/><p>Subheading</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat mattis vel id sociis diam id congue amet. Aliquam porttitor auctor amet, pretium sapien posuere non. Massa mi aenean urna eu. Sit libero, tortor amet cursus. Interdum sed vitae, odio est pretium velit duis. Quis velit quis neque, lorem nulla commodo. Praesent imperdiet in diam dictum. Rutrum sit viverra commodo nunc, eget. Turpis ornare viverra nunc egestas eu, nisi, pretium risus.</p><br/><br/><br/><img src='/assets/images/news/news_detail_image3.png' width='100%'/><br/><br/><br/><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat mattis vel id sociis diam id congue amet. Aliquam porttitor auctor amet, pretium sapien posuere non. Massa mi aenean urna eu. Sit libero, tortor amet cursus. Interdum sed vitae, odio est pretium velit duis. Quis velit quis neque, lorem nulla commodo. Praesent imperdiet in diam dictum. Rutrum sit viverra commodo nunc, eget. Turpis ornare viverra nunc egestas eu, nisi, pretium risus.</p><p>Eeww non. Massa mi aenean urna eu. Sit libero, tortor amet cursus. Interdum sed vitae, odio est pretium velit duis. Quis velit quis nEeww non. Massa mi aenean urna eu. Sit libero, tortor amet cursus. Interdum sed vitae, odio est pretium velit duis. Quis velit quis n</p><br/><br/><br/>",
    images: [
      "/assets/images/news/news_detail_image1.png",
      "/assets/images/news/news_detail_image2.png",
      "/assets/images/news/news_detail_mobile_banner.png",
    ],
    socials: [
      {
        type: "facebook",
        icon: "",
        url: "https://facebook.com",
      },
      {
        type: "twitter",
        icon: "",
        url: "https://twitter.com",
      },
      {
        type: "linkedin",
        icon: "",
        url: "https://linkedin.com",
      },
      {
        type: "telegram",
        icon: "",
        url: "https://telegram.com",
      },
    ],
  };
  const faqs = [
    {
      id: "0",
      date: "Sept 23, 2021",
      title: "What Insurance Do You Really Need for An Investment Property?",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat mattis vel id sociis diam id congue amet. Aliquam porttitor auctor amet, pretium sapien posuere non.</p>",
    },
    {
      id: "1",
      date: "Sept 23, 2021",
      title: "8 Must Have When Choosing A Rental Property",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat mattis vel id sociis diam id congue amet. Aliquam porttitor auctor amet, pretium sapien posuere non.</p>",
    },
  ];
  const footerPanelData = {
    headingRedactor:
      "<h1><strong>Like to know more about Allam Homes?</strong><br/>Contact an Allam home specialist.</h1>",
    introBlurb:
      "<p>Our history spans 25 years and during that time we’ve helped thousands  of customers find a new home, with homes and estates spread across many of Sydney’s most popular areas.</p>",
    buttons: [
      {
        buttonType: "light",
        buttonLink: "/get-in-touch",
        buttonLabel: "Contact an Agent",
      },
    ],
  };

  return (
    <Layout layoutData={layoutData}>
      <Hero title={news.title} date={news.date} bannerImage={news.images[2]} />
      <DetailContent data={news} faqs={faqs} />
      <KnowMoreAllamHomes data={footerPanelData} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async function ({ params }) {
  //   const slug = get(params, "slug");
  const layoutData = await craftAPI(layoutQuery);

  //   const newsDetailQuery = gql`
  //     query newsQuery($slug: [String] = "${slug}") {
  //       entry(section: "homesAndLand", slug: $slug) {
  //         ... on homesAndLand_default_Entry {
  //           title
  //           suburb
  //           lotNumber
  //           address
  //           estate {
  //             ... on estates_default_Entry {
  //               title
  //               salesCentre {
  //                 ... on locations_default_Entry {
  //                   title
  //                   phoneNumber
  //                 }
  //               }
  //             }
  //           }
  //           images {
  //             title
  //             url
  //             width
  //             height
  //           }
  //           sellingLabel
  //           landSize
  //           introBlurb
  //           latitude
  //           longitude
  //           downloadableBrochure {
  //             url
  //           }
  //         }
  //       }
  //     }
  //   `;

  //   const newsDetail = await craftAPI(newsDetailQuery);

  return {
    props: {
      // newsDetail,
      layoutData,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default NewsDetail;