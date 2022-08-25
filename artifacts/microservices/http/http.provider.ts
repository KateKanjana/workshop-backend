import { urlsForHTTP } from './http.decorator';
import { Provider } from '@nestjs/common';
import { HTTPService } from './http.service';

function httpFactory(httpService: HTTPService, url: string) {
  if (url) {
    httpService.setUrl(url);
  }
  return httpService;
}

function createHttpProvider(url: string): Provider<HTTPService> {
  return {
    provide: `HTTPService${url}`,
    useFactory: (httpService) => httpFactory(httpService, url),
    inject: [HTTPService],
  };
}

export function createHttpProviders(): Array<Provider<HTTPService>> {
  return urlsForHTTP.map((url) => createHttpProvider(url));
}
