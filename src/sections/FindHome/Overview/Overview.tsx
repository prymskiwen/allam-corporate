import React from "react";
import { useRecoilValue } from "recoil";
import classnames from "classnames/bind";

import { HomeModel } from "@models";
import { filteredHomes } from "@states/atoms/homes";
import MapView from "@components/MapView/MapView";
import styles from "./Overview.module.scss";

const cx = classnames.bind(styles);

export interface IOverviewProps {
  isFullScreen?: boolean;
}

const Overview = ({ isFullScreen = false }: IOverviewProps) => {
  const homesList: HomeModel[] = useRecoilValue(filteredHomes);

  return (
    <div className={cx("overview", { fullScreen: isFullScreen })}>
      <MapView data={homesList} type="home" />
    </div>
  );
};

export default Overview;
