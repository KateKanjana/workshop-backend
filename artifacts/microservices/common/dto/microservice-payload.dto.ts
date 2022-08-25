export class MicroservicePayloadDTO {
  service: string;
  event: string;
  command: MicroserviceCommand;
  data: any = null;
}

export class MicroserviceCommand {
  partialParams: string[];
}
