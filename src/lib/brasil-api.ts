import axios, { AxiosInstance } from 'axios';

export class BrasilAPI {
  #baseURL: AxiosInstance;

  constructor() {
    this.#baseURL = axios.create({
      baseURL: 'https://brasilapi.com.br/api/',
    });
  }

  async getLocationByPostalCode(postalCode: string | number) {
    try {
      const response = await this.#baseURL.get(`/cep/v1/${postalCode}`);
      return response.data;
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        throw new Error('Internal server error.');
      }

      if (err.response!.status === 404) {
        throw new Error('Invalid postal code.');
      }
    }
  }

  checkIfCityCoexistsToState(city: string, state: string) {
    return;
  }
}
