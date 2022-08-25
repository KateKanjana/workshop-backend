import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class PublicSignatureAuthGuard implements CanActivate {
  private authKey: any;

  constructor(configService: ConfigService) {
    this.authKey = configService.get<string>('AUTH_KEY');

    // const sha256 = CryptoJS.HmacSHA256(
    //   configService.get<string>('AUTH_PUBLIC_KEY') + '_' + new Date().getTime(),
    //   configService.get<string>('AUTH_PUBLIC_KEY'),
    // );
    // const nonce = CryptoJS.enc.Base64.stringify(sha256);
    // console.log(
    //   'example nonce',
    //   nonce,
    //   configService.get<string>('AUTH_PUBLIC_KEY') + '_' + new Date().getTime(),
    // );
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request: any) {
    // console.log('request', request);
    // console.log('request headers', request.headers);
    console.log('method', request.method);
    console.log('path', request.path);
    console.log('body', request.body);
    console.log('request signature', request.headers.signature);
    console.log('nonce', request.headers.nonce);
    console.log('public_key', request.headers.public_key);
    console.log('private_key', this.authKey[request.headers.public_key]);
    if (!this.authKey[request.headers.public_key]) {
      return false;
    }

    const sha256 = CryptoJS.HmacSHA256(
      request.path +
        '.' +
        JSON.stringify(request.body) +
        '.' +
        request.headers.nonce,
      this.authKey[request.headers.public_key],
    );

    const signature = CryptoJS.enc.Hex.stringify(sha256);
    console.log('signature', signature);

    if (signature !== request.headers.signature) {
      return false;
    }

    return true;
  }
}
