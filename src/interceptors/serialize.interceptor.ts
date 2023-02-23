import { NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const Serialize = <T>(dto: ClassConstructor<T>) => UseInterceptors(new SerializeInterceptor(dto));

export class SerializeInterceptor<T, R> implements NestInterceptor<T, R> {
  constructor(private dto: ClassConstructor<R>) {}

  intercept(_context: ExecutionContext, handler: CallHandler<T>): Observable<R> | Promise<Observable<R>> {
    return handler.handle().pipe(
      map((data: T) =>
        plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
