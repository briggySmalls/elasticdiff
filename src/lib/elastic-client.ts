import { fetchMethod } from '$lib/helpers/fetch';
import { stringifyJson } from './helpers/json/stringify';

export class ElasticClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async search(index: string, body: object): Promise<any> {
    const url = `${this.baseUrl}/${index}/_search`;
    try {
      return await fetchMethod(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: stringifyJson(body),
      });
    } catch (err) {
      console.error(`Error in search: ${err}`);
    }
  }

  async getIndexes(): Promise<any> {
    const url = `${this.baseUrl}/_cat/indices?v`;
    try {
      return await fetchMethod(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error(`Error in getIndexes: ${err}`);
    }
  }
}
