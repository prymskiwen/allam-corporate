import React from "react";
import BreadCrumb from "@components/BreadCrumb/BreadCrumb";
import { Redactor } from "@components/Common/Common";
import styles from "./Hero.module.scss";

type IHeroProps = {
  heading?: string;
  introBlurb?: string;
};

const Hero = ({ heading, introBlurb = "" }: IHeroProps) => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroBreadcrumb}>
          <BreadCrumb />
        </div>
        <div className={styles.heroContent}>
          <h1>{heading}</h1>
          <div className={styles.heroContentText}>
            <Redactor>{introBlurb}</Redactor>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
