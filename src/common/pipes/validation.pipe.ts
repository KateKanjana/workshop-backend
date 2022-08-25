import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, { metatype }: ArgumentMetadata) {
    console.log(value);
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const constraints = errors.map((m) => m.constraints);
      if (constraints.length > 0) {
        const constraint = constraints[0];
        const message = Object.keys(constraint).map((key) => constraint[key]);
        if (message.length > 0) {
          throw new BadRequestException(message[message.length - 1]);
        }
      }
      throw new BadRequestException('Validation faild.');
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
