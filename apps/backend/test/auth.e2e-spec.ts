import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('Auth (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, forbidNonWhitelisted: true }),
    );

    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    jwtService = moduleFixture.get<JwtService>(JwtService);
  });

  afterEach(async () => {
    // Clean up test data after each test (in reverse order of foreign keys)
    try {
      await prisma.orderItem.deleteMany({});
      await prisma.order.deleteMany({});
      await prisma.address.deleteMany({});
      await prisma.telephone.deleteMany({});
      await prisma.user.deleteMany({});
    } catch (error) {
      // Silently fail if tables don't exist yet
      console.log('Cleanup notice: Some tables may not exist yet');
    }
  });

  afterAll(async () => {
    // Clean up all data after all tests
    try {
      await prisma.orderItem.deleteMany({});
      await prisma.order.deleteMany({});
      await prisma.address.deleteMany({});
      await prisma.telephone.deleteMany({});
      await prisma.user.deleteMany({});
    } catch (error) {
      // Silently fail if tables don't exist
      console.log('Final cleanup notice: Some tables may not exist');
    }

    await app.close();
  });

  describe('POST /auth/register', () => {
    /**
     * Test Case 1: Đăng ký thành công
     * - Tạo user mới với thông tin hợp lệ
     * - Kiểm tra response trả về user data và access token
     * - Kiểm tra JWT token có chứa đúng thông tin
     */
    it('should successfully register a new user', async () => {
      const registerDto = {
        email: 'newuser@example.com',
        password: 'SecurePassword123',
        name: 'John Doe',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      expect(response.body).toMatchObject({
        statusCode: 201,
        success: true,
        message: 'Registration successful',
      });

      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('access_token');
      expect(response.body.data).toHaveProperty('token_type', 'Bearer');

      // Validate user data
      const { user } = response.body.data;
      expect(user).toMatchObject({
        email: registerDto.email,
        name: registerDto.name,
        role: 'USER',
        isActive: true,
      });
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('createdAt');

      // Verify JWT token
      const decoded = jwtService.verify(response.body.data.access_token);
      expect(decoded).toMatchObject({
        email: registerDto.email,
        role: 'USER',
        sub: user.id,
      });
      expect(decoded).toHaveProperty('iat');
      expect(decoded).toHaveProperty('exp');
    });

    /**
     * Test Case 2: Đăng ký email đã tồn tại
     * - Cố gắng đăng ký với email đã được sử dụng
     * - Kiểm tra lỗi 409 Conflict
     */
    it('should fail if email already registered', async () => {
      const registerDto = {
        email: 'existing@example.com',
        password: 'Password123',
        name: 'John Doe',
      };

      // Register user first time
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      // Try to register with same email
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(409);

      expect(response.body).toMatchObject({
        statusCode: 409,
        message: 'Email already registered',
        error: 'Conflict',
      });
    });

    /**
     * Test Case 3: Validation - Email format không hợp lệ
     * - Gửi email không đúng định dạng
     * - Kiểm tra lỗi 400 Bad Request
     */
    it('should fail validation with invalid email format', async () => {
      const registerDto = {
        email: 'invalid-email', // Invalid email format
        password: 'Password123',
        name: 'John Doe',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(400);

      expect(response.body).toMatchObject({
        statusCode: 400,
        error: 'Bad Request',
      });
      expect(response.body.message).toContain('email must be an email');
    });

    /**
     * Test Case 4: Validation - Password quá ngắn
     * - Gửi password ít hơn 6 ký tự
     * - Kiểm tra lỗi 400 Bad Request
     */
    it('should fail validation with password too short', async () => {
      const registerDto = {
        email: 'user@example.com',
        password: 'Pass1', // Less than 6 characters
        name: 'John Doe',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(400);

      expect(response.body).toMatchObject({
        statusCode: 400,
        error: 'Bad Request',
      });
      expect(response.body.message).toContain(
        'password must be longer than or equal to 6 characters',
      );
    });

    /**
     * Test Case 5: Validation - Missing required fields
     * - Gửi request thiếu required fields
     * - Kiểm tra lỗi 400 Bad Request
     */
    it('should fail validation with missing required fields', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'user@example.com',
          // Missing password, name
        })
        .expect(400);

      expect(response.body).toMatchObject({
        statusCode: 400,
        error: 'Bad Request',
      });
      expect(response.body.message.length).toBeGreaterThan(0);
    });

    /**
     * Test Case 6: Password should be hashed (não armazenar em plain text)
     * - Verificar que a senha no banco de dados está hashed
     */
    it('should hash password and not store in plain text', async () => {
      const registerDto = {
        email: 'hashtest@example.com',
        password: 'PlainTextPassword123',
        name: 'Hash Test',
      };

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      // Retrieve user from database
      const user = await prisma.user.findUnique({
        where: { email: registerDto.email },
      });

      expect(user).toBeDefined();
      expect(user?.password).not.toBe(registerDto.password); // Should not be plain text
      expect(user?.password?.length).toBeGreaterThan(20); // Hashed password is longer
    });
  });

  describe('POST /auth/login', () => {
    let testUser: any;

    beforeEach(async () => {
      // Create a test user for login tests
      const registerDto = {
        email: 'login@example.com',
        password: 'TestPassword123',
        name: 'Login Test',
      };

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      testUser = await prisma.user.findUnique({
        where: { email: registerDto.email },
      });
    });

    /**
     * Test Case 7: Đăng nhập thành công
     * - Đăng nhập với email và password đúng
     * - Kiểm tra response trả về user data và access token
     * - Kiểm tra JWT token hợp lệ
     */
    it('should successfully login with valid credentials', async () => {
      const loginDto = {
        email: 'login@example.com',
        password: 'TestPassword123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(200);

      expect(response.body).toMatchObject({
        statusCode: 200,
        success: true,
        message: 'Login successful',
      });

      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('access_token');
      expect(response.body.data).toHaveProperty('token_type', 'Bearer');

      const { user } = response.body.data;
      expect(user).toMatchObject({
        email: loginDto.email,
        name: 'Login Test',
        role: 'USER',
        isActive: true,
      });

      // Verify JWT token
      const decoded = jwtService.verify(response.body.data.access_token);
      expect(decoded).toMatchObject({
        email: loginDto.email,
        role: 'USER',
        sub: testUser.id,
      });
    });

    /**
     * Test Case 8: Đăng nhập sai mật khẩu
     * - Cố gắng đăng nhập với mật khẩu sai
     * - Kiểm tra lỗi 401 Unauthorized
     */
    it('should fail login with wrong password', async () => {
      const loginDto = {
        email: 'login@example.com',
        password: 'WrongPassword123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      });

      expect(response.body).not.toHaveProperty('data');
    });

    /**
     * Test Case 9: Đăng nhập tài khoản không tồn tại
     * - Cố gắng đăng nhập với email không tồn tại
     * - Kiểm tra lỗi 401 Unauthorized
     */
    it('should fail login if account does not exist', async () => {
      const loginDto = {
        email: 'nonexistent@example.com',
        password: 'SomePassword123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      });
    });

    /**
     * Test Case 10: Đăng nhập tài khoản bị vô hiệu hóa
     * - Tạo user và disable nó
     * - Cố gắng đăng nhập với tài khoản disabled
     * - Kiểm tra lỗi 401 Unauthorized
     */
    it('should fail login if account is disabled', async () => {
      // Disable the test user
      await prisma.user.update({
        where: { id: testUser.id },
        data: { isActive: false },
      });

      const loginDto = {
        email: 'login@example.com',
        password: 'TestPassword123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(401);

      expect(response.body).toMatchObject({
        statusCode: 401,
        message: 'Account is disabled',
        error: 'Unauthorized',
      });
    });

    /**
     * Test Case 11: Validation - Email format không hợp lệ
     */
    it('should fail validation with invalid email format', async () => {
      const loginDto = {
        email: 'invalid-email',
        password: 'TestPassword123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(400);

      expect(response.body).toMatchObject({
        statusCode: 400,
        error: 'Bad Request',
      });
    });

    /**
     * Test Case 12: Validation - Password quá ngắn
     */
    it('should fail validation with password too short', async () => {
      const loginDto = {
        email: 'login@example.com',
        password: 'Short', // Less than 6 characters
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(400);

      expect(response.body).toMatchObject({
        statusCode: 400,
        error: 'Bad Request',
      });
    });

    /**
     * Test Case 13: JWT Token Validation
     * - Token có thể được verify
     * - Token không expire ngay lập tức
     * - Token chứa đúng thông tin user
     */
    it('should validate JWT token correctly', async () => {
      const loginDto = {
        email: 'login@example.com',
        password: 'TestPassword123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(200);

      const token = response.body.data.access_token;

      // Token should be verifiable
      expect(() => jwtService.verify(token)).not.toThrow();

      // Decode and check payload
      const decoded = jwtService.verify(token);
      expect(decoded).toHaveProperty('sub'); // User ID
      expect(decoded).toHaveProperty('email');
      expect(decoded).toHaveProperty('role');
      expect(decoded).toHaveProperty('iat'); // Issued at
      expect(decoded).toHaveProperty('exp'); // Expiration

      // Check that token is not expired
      const currentTime = Math.floor(Date.now() / 1000);
      expect(decoded.exp).toBeGreaterThan(currentTime);
    });

    /**
     * Test Case 14: Invalid token should fail verification
     */
    it('should fail verification with invalid token', async () => {
      const invalidToken = 'invalid.token.here';

      expect(() => jwtService.verify(invalidToken)).toThrow();
    });
  });

  describe('Integration Tests', () => {
    /**
     * Test Case 15: Full flow - Register, Login, and use token
     * - Đăng ký user
     * - Đăng nhập lấy token
     * - Sử dụng token để access protected route
     */
    it('should complete full register and login flow', async () => {
      const registerDto = {
        email: 'fullflow@example.com',
        password: 'FullFlowPassword123',
        name: 'Full Flow',
      };

      // Step 1: Register
      const registerResponse = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      expect(registerResponse.body.data).toHaveProperty('access_token');
      const registerToken = registerResponse.body.data.access_token;

      // Step 2: Login
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: registerDto.email,
          password: registerDto.password,
        })
        .expect(200);

      expect(loginResponse.body.data).toHaveProperty('access_token');
      const loginToken = loginResponse.body.data.access_token;

      // Both tokens should be valid and contain same user info
      const registerDecoded = jwtService.verify(registerToken);
      const loginDecoded = jwtService.verify(loginToken);

      expect(registerDecoded.email).toBe(loginDecoded.email);
      expect(registerDecoded.sub).toBe(loginDecoded.sub);
      expect(registerDecoded.role).toBe(loginDecoded.role);
    });

    /**
     * Test Case 16: Multiple different users can register
     */
    it('should support multiple users registration', async () => {
      const users = [
        {
          email: 'user1@example.com',
          password: 'Pass1234',
          name: 'User One',
        },
        {
          email: 'user2@example.com',
          password: 'Pass5678',
          name: 'User Two',
        },
        {
          email: 'user3@example.com',
          password: 'Pass9012',
          name: 'User Three',
        },
      ];

      const registeredUsers = [];

      for (const user of users) {
        const response = await request(app.getHttpServer())
          .post('/auth/register')
          .send(user)
          .expect(201);

        registeredUsers.push(response.body.data.user);
      }

      // Verify all users are different
      expect(registeredUsers).toHaveLength(3);
      const emails = registeredUsers.map((u) => u.email);
      expect(new Set(emails).size).toBe(3); // All unique
    });
  });
});
