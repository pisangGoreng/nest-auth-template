import { SetMetadata } from '@nestjs/common';

export const HasPermission = (access: string) => {
  return SetMetadata('access', access);
};
