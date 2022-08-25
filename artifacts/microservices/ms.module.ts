import { DynamicModule, Global, Module } from '@nestjs/common';
import { HTTPModule } from './http/http.module';
import { TCPModule } from './tcp/tcp.module';

@Global()
@Module({
  // imports: [TCPModule, HTTPModule.forRoot()],
  // controllers: [],
  // providers: [],
  // exports: [TCPModule, HTTPModule.forRoot()],
})
export class MicroservicesModule {
  static forRoot(): DynamicModule {
    const httpModule = HTTPModule.forRoot();
    return {
      module: MicroservicesModule,
      imports: [TCPModule, httpModule],
      exports: [TCPModule, httpModule],
    };
  }
}
