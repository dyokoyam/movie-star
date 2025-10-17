export type ApiClientOptions = {
  baseUrl?: string;
};

export class ApiClient {
  constructor(private readonly options: ApiClientOptions = {}) {}

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.options.baseUrl ?? ""}${path}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  }
}
