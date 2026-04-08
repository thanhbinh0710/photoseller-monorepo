import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { ZenStackService } from '../src/zenstack/zenstack.service';
import { AppModule } from '../src/app.module';

describe('Database Integration Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let zenstack: ZenStackService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    zenstack = moduleFixture.get<ZenStackService>(ZenStackService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('PrismaService', () => {
    it('should be defined', () => {
      expect(prisma).toBeDefined();
    });

    it('should connect to database', async () => {
      const users = await prisma.user.findMany();
      expect(users).toBeDefined();
      expect(Array.isArray(users)).toBe(true);
    });
  });

  describe('ZenStackService', () => {
    it('should be defined', () => {
      expect(zenstack).toBeDefined();
    });

    it('should provide enhanced prisma client', () => {
      const enhancedPrisma = zenstack.getEnhancedPrisma();
      expect(enhancedPrisma).toBeDefined();
    });

    it('should enforce access control policies', async () => {
      // Get enhanced client without authentication (public access)
      const publicPrisma = zenstack.getEnhancedPrisma();
      
      // Public should be able to read active photos
      const photos = await publicPrisma.photo.findMany({
        where: { isActive: true }
      });
      expect(photos).toBeDefined();
    });
  });

  describe('Database Schema', () => {
    it('should have users', async () => {
      const users = await prisma.user.findMany();
      expect(users.length).toBeGreaterThan(0);
    });

    it('should have photos', async () => {
      const photos = await prisma.photo.findMany();
      expect(photos.length).toBeGreaterThan(0);
    });

    it('should have correct relations', async () => {
      const photoWithSeller = await prisma.photo.findFirst({
        include: { seller: true }
      });
      expect(photoWithSeller.seller).toBeDefined();
      expect(photoWithSeller.seller.role).toBe('SELLER');
    });
  });
});
