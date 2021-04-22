import { SetMetadata } from '@nestjs/common';

import { UserRole } from 'common/models/user.interface';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
