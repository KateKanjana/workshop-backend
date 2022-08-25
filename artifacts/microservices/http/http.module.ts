import { DynamicModule, HttpModule, Module } from '@nestjs/common';
import { createHttpProviders } from './http.provider';
import { HTTPService } from './http.service';

@Module({
  imports: [
    HttpModule,
    // Ex. console configuration of HttpModule
    // ConfigModule,
    // HttpModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     baseURL: configService.get('vendors.apiEndpoint'),
    //     headers: {
    //       Authorization: 'Basic ' + configService.get('vendors.encodeToken'),
    //     },
    //     timeout: 7000,
    //     maxRedirects: 5,
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
})
export class HTTPModule {
  static forRoot(): DynamicModule {
    const urlHttpProviders = createHttpProviders();
    return {
      module: HTTPModule,
      providers: [HTTPService, ...urlHttpProviders],
      exports: [HTTPService, ...urlHttpProviders],
    };
  }
}
