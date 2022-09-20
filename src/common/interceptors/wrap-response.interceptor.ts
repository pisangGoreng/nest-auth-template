import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { success, error } from 'src/common/responses';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        const isSuccess = [200, 201].includes(response.statusCode);
        if (isSuccess) return success('OK', data, response.statusCode);

        const isError = [400, 401, 403, 404].includes(response.statusCode);
        if (isError) return error(data, response.statusCode);
      }),
    );
  }
}
