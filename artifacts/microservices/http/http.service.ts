import { HttpService, Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT, // make url not remember latest vale
})
export class HTTPService {
  private url?: string;

  constructor(private readonly httpService: HttpService) {}

  setUrl(url: string) {
    this.url = url;
  }

  getUrl(): string {
    return this.url;
  }

  private adjustURLPath(path?: string) {
    return path ? this.url + path : this.url;
  }

  async get<T>(path?: string, headersRequest?: any): Promise<T> {
    const urlPath = this.adjustURLPath(path);

    const res = await this.httpService
      .get(urlPath, { headers: headersRequest })
      .toPromise();
    return res.data;
  }

  async post<T>(
    path?: string,
    payload?: any,
    headersRequest?: any,
  ): Promise<T> {
    const urlPath = this.adjustURLPath(path);

    const res = await this.httpService
      .post(urlPath, payload, { headers: headersRequest })
      .toPromise();
    return res.data;
  }

  async put<T>(path?: string, payload?: any, headersRequest?: any): Promise<T> {
    const urlPath = this.adjustURLPath(path);

    const res = await this.httpService
      .put(urlPath, payload, { headers: headersRequest })
      .toPromise();
    return res.data;
  }

  async patch<T>(
    path?: string,
    payload?: any,
    headersRequest?: any,
  ): Promise<T> {
    const urlPath = this.adjustURLPath(path);

    const res = await this.httpService
      .patch(urlPath, payload, { headers: headersRequest })
      .toPromise();
    return res.data;
  }

  async del<T>(path?: string, headersRequest?: any): Promise<T> {
    const urlPath = this.adjustURLPath(path);

    const res = await this.httpService
      .delete(urlPath, { headers: headersRequest })
      .toPromise();
    return res.data;
  }
}
