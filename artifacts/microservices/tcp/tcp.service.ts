import { Injectable } from '@nestjs/common';
import { MicroservicePayloadDTO } from '../common/dto/microservice-payload.dto';

@Injectable()
export class TCPService {
  private mapTCPMessageHandler: Map<string, any>;

  constructor() {
    this.mapTCPMessageHandler = new Map<string, any>();
  }

  addTCPMessageHandler(serviceName: string, classHandler: any) {
    this.mapTCPMessageHandler.set(serviceName, classHandler);
  }

  onTCPMessageHandler(payload: MicroservicePayloadDTO) {
    if (payload.command && payload.command.partialParams) {
      const dataFromParams = [];
      payload.command.partialParams.forEach((param) => {
        dataFromParams.push(payload.data[param]);
      });
      return this.mapTCPMessageHandler
        .get(payload.service)
        [payload.event](...dataFromParams);
    }
    return this.mapTCPMessageHandler
      .get(payload.service)
      [payload.event](payload);
  }

  /**
   * Testing list function name from class
   * Use for testing only
   */
  // private getAllMethodNames(obj) {
  //   const methods = new Set();
  //   while ((obj = Reflect.getPrototypeOf(obj))) {
  //     const keys = Reflect.ownKeys(obj);
  //     keys.forEach((k) => methods.add(k));
  //   }
  //   return methods;
  // }
}
