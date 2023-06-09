import React from "react";
import { useRouter } from "next/router";
import BreadCrumb from "@components/BreadCrumb/BreadCrumb";
import { Button, ActionButton, ImageButton } from "@components/Common/Common";
import Icon from "@components/Icons/Icons";
import { CraftImage } from "@models";
import styles from "./Hero.module.scss";

type IHeroProps = {
  title: string;
  landSize: number;
  sellingLabel: string;
  logo?: CraftImage[];
  estateId?: string;
};

const Hero = ({ title, landSize, sellingLabel, estateId }: IHeroProps) => {
  const router = useRouter();

  return (
    <div className={styles.hero}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroBreadcrumb}>
          <BreadCrumb />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroContentBack}>
            <ActionButton
              type="chevron-left"
              label="Back"
              onClick={() => router.back()}
            />
          </div>

          <div className={styles.heroContentText}>
            <div className={styles.heroContentTextSelling}>
              <Icon type="flag" />
              <p>
                <strong>{sellingLabel}</strong>
              </p>
            </div>

            <h1 className="h2">{title}</h1>
            <p>
              Land size{" "}
              <strong>
                {landSize}
                <span>
                  m<sup>2</sup>
                </span>
              </strong>
            </p>
          </div>

          <div className={styles.heroContentCTA}>
            <div className={styles.heroContentButtons}>
              <ImageButton
                href={`/get-in-touch${estateId ? "?estate=" + estateId : ""}`}
                icon="download-yellow"
                label="Click for Price"
                chevron={true}
                labelSpacingLeft={8}
                labelSpacingRight={16}
              />
              <Button href={`/get-in-touch${estateId ? "?estate=" + estateId : ""}`} rounded>
                Contact Agent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
