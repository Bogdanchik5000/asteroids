import nasaApi from "@/api/nasaApi";
import s from "./styles.module.css";
import { Metadata } from "next";
import { AsteroidIcon } from "@/icons";
import Link from "next/link";
import { Btn } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const allNearEarthObjects = await fetchAllNearEarthObjectsById(id);
  return {
    title: `Астероид ${allNearEarthObjects?.name ?? "-"}`,
    description: "Узнайте подробную информацию об астероиде",
  };
}

async function fetchAllNearEarthObjectsById(id: string) {
  return nasaApi.getAllNearEarthObjectsById(id).catch((error) => {
    console.error(error);
    return null;
  });
}

export default async function AsteroidPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const allNearEarthObjects = await fetchAllNearEarthObjectsById(id);

  if (!allNearEarthObjects) {
    return <div>Ошибка</div>;
  }

  const size =
    allNearEarthObjects.estimated_diameter.meters.estimated_diameter_max.toFixed();

  return (
    <div className={s.wrap}>
      <div className={s.asteroidData}>
        <AsteroidIcon size={+size > 100 ? "lg" : "sm"} />
        <ul className={s.asteroidInfo}>
          <li>Имя: {allNearEarthObjects.name}</li>
          <li>Размер: {size} м</li>
          {!allNearEarthObjects.is_potentially_hazardous_asteroid && (
            <li className={s.danger}>⚠ Опасен</li>
          )}
        </ul>
      </div>

      <div className={s.approachData}>
        <div className={s.approachDataTitle}>
          Всего сближений: {allNearEarthObjects.close_approach_data.length}:
        </div>

        {allNearEarthObjects.close_approach_data.map((approach, index) => (
          <div key={index} className={s.approach}>
            <div className={s.approachTitle}>Сближение {index + 1}:</div>
            <ul className={s.approachList}>
              <li>
                Скорость относительно земли ~{" "}
                {Number(approach.relative_velocity.miles_per_hour).toFixed()}{" "}
                км/ч
              </li>
              <li>
                Расстояние до земли ~{" "}
                {Number(approach.miss_distance.kilometers).toFixed()} км
              </li>
              <li>Орбита: {approach.orbiting_body}</li>
            </ul>
          </div>
        ))}
      </div>

      <Link href="/" className={s.btnBack}>
        <Btn size="md">Назад к списку</Btn>
      </Link>
    </div>
  );
}
