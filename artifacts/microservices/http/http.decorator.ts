import { Inject } from '@nestjs/common';

export const urlsForHTTP: string[] = new Array<string>();

export function HTTPURL(url = '') {
  if (!urlsForHTTP.includes(url)) {
    urlsForHTTP.push(url);
  }
  return Inject(`HTTPService${url}`);
}
