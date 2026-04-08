import { Injectable } from '@nestjs/common';
import { enhance } from '@zenstackhq/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
}

@Injectable()
export class ZenStackService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get an enhanced Prisma client with access control policies applied
   * @param user - The authenticated user (or undefined for public access)
   */
  getEnhancedPrisma(user?: AuthUser) {
    return enhance(this.prisma, { user: user as any });
  }

  /**
   * Get the raw Prisma client (bypasses all access control)
   * Use with caution - only for admin operations or system tasks
   */
  getRawPrisma() {
    return this.prisma;
  }
}
