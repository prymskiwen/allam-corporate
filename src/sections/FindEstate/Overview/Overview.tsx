import React, { useCallback, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import MapView from "@components/MapView/MapView";

import { filteredEstates } from "@states/atoms/estates";
import { convertGeoJSON } from "@utils/convertGeoJSON";

import styles from "./Overview.module.scss";

export interface IOverviewProps {
  homesList?: any[];
}

const Overview = ({ homesList }: IOverviewProps) => {
  const [geoList, setGeoList] = useState<any>();
  const estatesList = useRecoilValue(filteredEstates);

  const fetchGeoJSON = useCallback(() => {
    const features = estatesList
      .map((estate) => estate.geojson)
      .map((json) => convertGeoJSON(json))
      .reduce((prev, cur) => [...prev, ...cur.features], []);

    setGeoList({
      type: "FeatureCollection",
      features: features,
    });
  }, [estatesList]);

  useEffect(() => {
    fetchGeoJSON();
  }, [fetchGeoJSON]);

  return (
    <div className={styles.overview}>
      <MapView data={estatesList} geoJSON={geoList} homesList={homesList} />
    </div>
  );
};

export default Overview;
