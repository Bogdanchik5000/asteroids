import { NearEarthObject, RelativeUnitType } from "@/types/asteroid.type";
import cn from "classnames";
import s from "./AsteroidItem.module.css";
import { ArrowIcon, AsteroidIcon } from "@/icons";
import { Btn } from "@/components/ui";
import { use } from "react";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { format, parse } from "date-fns";
import { ru } from "date-fns/locale/ru";

interface Props {
  nearEarthObject: NearEarthObject;
  relativeUnit: RelativeUnitType;
  showPayBtn?: boolean;
  className?: string;
}

export function AsteroidItem({
  nearEarthObject,
  relativeUnit,
  showPayBtn = true,
  className,
}: Props) {
  const { cart, toggleCart } = use(CartContext);

  const ordered = !!cart.find((item) => item.id === nearEarthObject.id);

  const distances = {
    kilometers: nearEarthObject.close_approach_data[0].miss_distance.kilometers,
    lunar: nearEarthObject.close_approach_data[0].miss_distance.lunar,
  };

  const size =
    +nearEarthObject.estimated_diameter.meters.estimated_diameter_max.toFixed();

  const formatDistance = (): string => {
    const distance = Math.round(+distances[relativeUnit]).toLocaleString(
      "ru-RU"
    );
    const end = relativeUnit === "kilometers" ? "км" : "ло";
    return `${distance} ${end}`;
  };

  const formatApproachDate = (): string => {
    const date = parse(
      nearEarthObject.close_approach_data[0].close_approach_date_full,
      "yyyy-MMM-dd HH:mm",
      new Date()
    );
    return format(date, "d MMM yyyy", { locale: ru }).replaceAll(".", "");
  };

  return (
    <div className={cn(s.asteroid, className)}>
      <div className={s.approachDate}>{formatApproachDate()}</div>

      <div className={s.info}>
        <div className={s.distance}>
          <span>{formatDistance()}</span>
          <ArrowIcon />
        </div>

        <AsteroidIcon size={size > 100 ? "lg" : "sm"} />

        <div className={s.desc}>
          <Link href={`/asteroid/${nearEarthObject.id}`} className={s.name}>
            {nearEarthObject.name}
          </Link>
          <span className={s.size}>Ø {size} м</span>
        </div>
      </div>

      <div className={s.bottomContent}>
        {showPayBtn && (
          <Btn
            size="sm"
            onClick={() => toggleCart(nearEarthObject)}
            className={cn(s.orderBtn, { [s.ordered]: ordered })}
          >
            {ordered ? "В корзине" : "Заказать"}
          </Btn>
        )}
        {!!nearEarthObject.is_potentially_hazardous_asteroid && (
          <span className={s.danger}>⚠ Опасен</span>
        )}
      </div>
    </div>
  );
}
