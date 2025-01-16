"use client";

import nasaApi from "@/api/nasaApi";
import s from "./AsteroidsList.module.css";
import cn from "classnames";
import { Fragment, use, useEffect, useState } from "react";
import { NearEarthObject } from "@/types/asteroid.type";
import InfiniteScroll from "react-infinite-scroll-component";
import { AsteroidItem } from "@/components/shared/AsteroidItem/AsteroidItem";
import { RelativeUnitContext } from "@/context/RelativeUnitContext";

interface Props {
  title: string;
  className?: string;
}

export function AsteroidsList({ title, className }: Props) {
  const [nearEarthObjects, setNearEarthObjects] = useState<NearEarthObject[]>(
    []
  );
  const [date, setDate] = useState<Date>(new Date());
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isFirstRequest, setIsFirstRequest] = useState(true);

  const { relativeUnit, setRelativeUnit } = use(RelativeUnitContext);

  useEffect(() => {
    if (!isFirstRequest) return;

    async function fetchNearEarthObjects() {
      try {
        const nearNearthObjects = await nasaApi.getNearEarthObjects(date);

        setNearEarthObjects(nearNearthObjects);
        setIsFirstRequest(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }

    fetchNearEarthObjects();
  }, [date, isFirstRequest]);

  async function fetchMoreData() {
    try {
      const nextDate = new Date(date.setDate(date.getDate() + 1));
      const nearNearthObjects = await nasaApi.getNearEarthObjects(nextDate);

      if (!nearEarthObjects.length) {
        setHasMore(false);
        return;
      }

      setNearEarthObjects((prev) => [...prev, ...nearNearthObjects]);
      setDate(nextDate);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  return (
    <div className={cn(s.wrap, className)}>
      <h3 className={s.title}>{title}</h3>
      <div className={s.relativeUnits}>
        <span
          className={cn(s.relativeUnitText, {
            [s.active]: relativeUnit === "kilometers",
          })}
          onClick={() => setRelativeUnit("kilometers")}
        >
          в километрах
        </span>
        <div className={s.relativeUnitsDivider}></div>
        <span
          className={cn(s.relativeUnitText, {
            [s.active]: relativeUnit === "lunar",
          })}
          onClick={() => setRelativeUnit("lunar")}
        >
          в лунных орбитах
        </span>
      </div>

      <InfiniteScroll
        dataLength={nearEarthObjects.length}
        next={fetchMoreData}
        loader={<div>Загрузка...</div>}
        hasMore={hasMore}
        className={s.asteroids}
      >
        {nearEarthObjects.map((item) => (
          <Fragment key={item.id}>
            <AsteroidItem
              key={item.id}
              nearEarthObject={item}
              relativeUnit={relativeUnit}
            />
            {!!error && <div>Ошибка</div>}
          </Fragment>
        ))}
      </InfiniteScroll>
    </div>
  );
}
