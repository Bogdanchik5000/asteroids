class AsteroidService {
  getAsteroidEnding(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return "астероидов";
    }

    if (lastDigit === 1) {
      return "астероид";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return "астероида";
    } else {
      return "астероидов";
    }
  }
}

const asteroidService = new AsteroidService();

export default asteroidService;
