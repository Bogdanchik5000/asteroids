import { ApiResponse, NearEarthObject } from "@/types/asteroid.type";

class NasaApi {
  private API_TOKEN = "";
  private BASE_URL = "https://api.nasa.gov/neo/rest/v1";

  constructor() {
    if (!process.env.NEXT_PUBLIC_NASA_API_KEY) {
      throw new Error("NASA_API_KEY нет в .env");
    }
    this.API_TOKEN = process.env.NEXT_PUBLIC_NASA_API_KEY;
  }

  async getNearEarthObjects(date: Date): Promise<NearEarthObject[]> {
    const params = new URLSearchParams({
      start_date: date.toISOString().split("T")[0],
      end_date: date.toISOString().split("T")[0],
      api_key: this.API_TOKEN,
    }).toString();

    const res: ApiResponse = await fetch(
      `${this.BASE_URL}/feed?${params}`
    ).then((res) => res.json());

    return Object.values(res.near_earth_objects)[0];
  }

  async getAllNearEarthObjectsById(id: string): Promise<NearEarthObject> {
    const params = new URLSearchParams({
      api_key: this.API_TOKEN,
    }).toString();

    console.log(`${this.BASE_URL}/neo/${id}?${params}`);

    return fetch(`${this.BASE_URL}/neo/${id}?${params}`).then((res) =>
      res.json()
    );
  }
}

const nasaApi = new NasaApi();

export default nasaApi;
