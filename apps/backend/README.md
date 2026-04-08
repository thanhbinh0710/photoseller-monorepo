# PhotoSeller Backend

NestJS backend API for photo marketplace platform.

## 🚀 Quick Commands

```bash
# First time setup
npm install && docker-compose up -d && npm run db:reset

# Daily development
docker-compose up -d && npm run start:dev

# After changing schema.zmodel
npm run prisma:generate && npm run prisma:migrate:dev

# Add/update photos
npm run db:seed

# View database
npm run prisma:studio  # or http://localhost:8080 (phpMyAdmin)
```

---

## 📚 API Documentation (Swagger)

Swagger UI is available at: **http://localhost:8000/api**

### Available Endpoints

#### 🔐 Authentication (`/auth`)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

**Note:** Logout is handled client-side by deleting the JWT token from storage.

#### 👤 User Management (`/user`) - **Requires Authentication**
All endpoints require JWT Bearer token in Authorization header.

**Profile:**
- `GET /user/profile` - Get user profile with addresses and phone numbers

**Password:**
- `PUT /user/password` - Update password (requires current password)

**Phone Numbers (Max 3):**
- `POST /user/telephones` - Add phone number
- `PUT /user/telephones/:id` - Update phone number
- `DELETE /user/telephones/:id` - Delete phone number
- `PATCH /user/telephones/:id/primary` - Set as primary

**Addresses (Max 3):**
- `POST /user/addresses` - Add address
- `PUT /user/addresses/:id` - Update address
- `DELETE /user/addresses/:id` - Delete address
- `PATCH /user/addresses/:id/primary` - Set as primary

### Testing Auth APIs with Swagger

**1. Start the server:**
```bash
npm run start:dev
```

**2. Open Swagger UI:**
Visit http://localhost:8000/api

**3. Test Register:**
- Click on `POST /auth/register`
- Click "Try it out"
- Fill in the request body:
```json
{
  "email": "test@example.com",
  "password": "Test123",
  "firstName": "Test",
  "lastName": "User"
}
```
- Click "Execute"
- **Success Response (201):**
```json
{
  "statusCode": 201,
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": 4,
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "USER",
      "isActive": true,
      "createdAt": "2026-04-06T10:00:00.000Z"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer"
  }
}
```

**4. Test Login:**
- Click on `POST /auth/login`
- Use existing credentials:
```json
{
  "email": "user1@example.com",
  "password": "user123"
}
```
- **Success Response (200):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 2,
      "email": "user1@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "isActive": true
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer"
  }
}
```

**5. Copy the JWT token from `data.access_token`**

**6. To logout:** Simply delete the token from client-side storage (localStorage, sessionStorage, cookies, etc.)

**Response Structure:**
All successful responses include:
- `statusCode`: HTTP status code (200, 201, etc.)
- `success`: Boolean indicating success
- `message`: Human-readable message
- `data`: Response payload (optional)

**Error Response Example (401):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Response (201):
# {
#   "statusCode": 201,
#   "success": true,
#   "message": "Registration successful",
#   "data": {
#     "user": { ... },
#     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#     "token_type": "Bearer"
#   }
# }
```

**Login:**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user1@example.com",
    "password": "user123"
  }'

# Response (200):
# {
#   "statusCode": 200,
#   "success": true,
#   "message": "Login successful",
#   "data": {
#     "user": { ... },
#     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#     "token_type": "Bearer"
#   }
# }
```

**Logout:**
Logout is handled client-side by deleting the JWT token from storage:
```javascript
// Example in JavaScript
localStorage.removeItem('access_token');
// or
sessionStorage.removeItem('access_token');
```

**Using JWT Token in requests:**
```bash
curl -X GET http://localhost:8000/protected-endpoint \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Using Protected Endpoints

**1. Get JWT Token:**
First, login or register to get your access token.

**2. Use in Swagger:**
- Click the 🔒 "Authorize" button at the top right
- Enter: `Bearer <your_access_token>`
- Click "Authorize"
- Now all protected endpoints will include the token automatically

**3. Use with cURL:**
```bash
# Get user profile
curl -X GET http://localhost:8000/user/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Add phone number
curl -X POST http://localhost:8000/user/telephones \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+84901234567",
    "isPrimary": true
  }'

# Add address
curl -X POST http://localhost:8000/user/addresses \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "label": "Home",
    "street": "123 Nguyen Hue St",
    "city": "Ho Chi Minh City",
    "postalCode": "700000",
    "country": "Vietnam",
    "isPrimary": true
  }'

# Update password
curl -X PUT http://localhost:8000/user/password \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "user123",
    "newPassword": "NewPassword123"
  }'

# Set primary address
curl -X PATCH http://localhost:8000/user/addresses/1/primary \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Tech Stack

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **ZenStack** - Access control layer
- **MariaDB** - Database
- **Docker** - Containerization

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Docker Services
```bash
docker-compose up -d
```

This starts:
- MariaDB (port 3306)
- phpMyAdmin (http://localhost:8080)

### 3. Setup Database (First Time Only)
```bash
# Generate Prisma client & apply migrations & seed data
npm run db:reset
```

**Or step-by-step:**
```bash
npm run prisma:generate      # Generate Prisma client
npm run prisma:migrate:dev   # Apply migrations
npm run db:seed              # Seed with test data (110 photos)
```

### 4. Start Development Server
```bash
npm run start:dev
```

API will be available at http://localhost:8000

---

## Development Workflow

### When you change schema.zmodel:
```bash
npm run prisma:generate && npm run prisma:migrate:dev
```

### When you add new photos to storage/photo/:
```bash
npm run db:seed  # Re-runs seeder (upserts data, won't duplicate)
```

### Daily development:
```bash
docker-compose up -d   # Start database
npm run start:dev      # Start API server
```

## Environment Variables

Copy `.env.example` to `.env` or use these defaults:

```env
DATABASE_URL="mysql://photoseller:photoseller@localhost:3306/photoseller"
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
PORT=8000
```

## Database Commands

### 🔄 When You Change Schema (schema.zmodel)

**Step-by-step workflow:**

1. **Edit schema.zmodel** (add/change models)
2. **Generate Prisma schema:**
   ```bash
   npm run prisma:generate
   ```
3. **Create migration:**
   ```bash
   npm run prisma:migrate:dev
   # You'll be prompted to name the migration (e.g., "add_user_avatar")
   ```

**Quick combo** (all in one):
```bash
npm run prisma:generate && npm run prisma:migrate:dev
```

### 📦 Seeding Database

**⚠️ WARNING: Full reset (destroys all data):**
```bash
npm run db:reset  # Resets DB + runs migrations + seeds data
```

**Just seed without reset (safe):**
```bash
npm run db:seed   # Keeps existing data, adds/updates seeded records
```

**Use cases:**
- `db:reset` - Fresh start, development only
- `db:seed` - Add new photos, update categories, fix test data

### 🛠️ Other Commands

```bash
# Open Prisma Studio (database GUI)
npm run prisma:studio

# Deploy migrations to production (no prompts)
npm run prisma:migrate:deploy

# View migration status
npx prisma migrate status
```

## Database Schema

**⚠️ IMPORTANT:** 
- Edit `schema.zmodel` (your source file with access control)
- **NEVER** edit `prisma/schema.prisma` (auto-generated)

**Workflow:**
```
Edit schema.zmodel → npm run prisma:generate → npm run prisma:migrate:dev
```

### Models
- **User** - Users with roles (ADMIN | USER)
  - Admin can manage everything
  - Users can register, login, manage their profile
- **Telephone** - User phone numbers (max 3 per user)
- **Address** - User addresses (max 3 per user)
- **Category** (IDs: 1-3) - Botanical, Still-Life, Portrait
- **Size** (IDs: 1-4) - A4, A3, A2, A1 print sizes
- **Photo** (IDs: 1-110) - Auto-imported from storage folders
- **Order** - Customer orders
- **OrderItem** - Line items in orders

### Schema Files Explained

**📝 schema.zmodel** (YOUR FILE - EDIT THIS)
- Source of truth for your database
- Contains access control rules (`@@allow`, `@@deny`)
- ZenStack-specific features (`@password`, `@omit`)
- Location: `photoseller-be/schema.zmodel`

**🤖 prisma/schema.prisma** (AUTO-GENERATED - DON'T EDIT)
- Generated from schema.zmodel
- Standard Prisma format (access rules removed)
- Used by Prisma for migrations and client generation
- Has warning header: "DO NOT MODIFY THIS FILE"

**Workflow:**
```
You edit schema.zmodel → Run npm run prisma:generate → Generates schema.prisma → Prisma uses it
```

### Photo Storage
Photos are stored in `/storage/photo/` folder (not in git):
- `botanical/` - Botanical category photos
- `still-life/` - Still-Life category photos
- `portrait/` - Portrait category photos

## Test Data (After Seeding)

**Test user credentials:**
```
Admin:  admin@photoseller.com / admin123
User 1: user1@example.com / user123
User 2: user2@example.com / user123
```

**Database contains:**
- 3 users (1 admin, 2 regular users)
  - user1: 2 telephones, 2 addresses
  - user2: 1 telephone, 1 address
- 3 categories (Botanical, Still-Life, Portrait)
- 4 sizes (A4: 21×29.7cm, A3: 29.7×42cm, A2: 42×59.4cm, A1: 59.4×84.1cm)
- 110 photos (auto-imported from storage/photo/ folders)
  - 40 botanical photos
  - 33 still-life photos
  - 37 portrait photos

**Note:** Photos are assigned random sizes and prices ($29.99-$79.99) during seeding.

## Docker Services

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### Access Services
- API: http://localhost:8000
- **Swagger API Docs**: http://localhost:8000/api
- phpMyAdmin: http://localhost:8080
- Prisma Studio: `npm run prisma:studio` → http://localhost:5555

## Development

```bash
# Start dev server with hot reload
npm run start:dev

# Build for production
npm run build

# Run production build
npm run start:prod

# Lint code
npm run lint

# Format code
npm run format
```

## Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Common Issues & Solutions

### ❌ "Migration failed" or "Schema out of sync"
```bash
# Option 1: Soft fix (try first)
npm run prisma:generate
npm run prisma:migrate:dev

# Option 2: Hard reset (⚠️ deletes all data)
npm run db:reset
```

### ❌ Database Connection Error
Check if Docker is running:
```bash
docker-compose ps          # Check status
docker-compose up -d       # Start if stopped
docker-compose logs mariadb # View logs
```

### ❌ "Cannot find module '@prisma/client'"
```bash
npm run prisma:generate
```

### ❌ Build Errors After Schema Changes
```bash
npm run prisma:generate && npm run build
```

### 🔄 When to use each command:

| Situation | Command |
|-----------|---------|
| Changed schema.zmodel | `npm run prisma:generate && npm run prisma:migrate:dev` |
| Fresh start (dev) | `npm run db:reset` |
| Update seeded data | `npm run db:seed` |
| View database | `npm run prisma:studio` or phpMyAdmin |
| Migration conflicts | `npm run db:reset` (deletes data!) |
| Deploy to production | `npm run prisma:migrate:deploy` |

## Project Structure

```
photoseller-be/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Generated Prisma schema
│   └── seed.ts             # Database seeder
├── src/
│   ├── auth/               # Authentication module
│   │   ├── dto/            # Data Transfer Objects
│   │   │   ├── register.dto.ts
│   │   │   ├── login.dto.ts
│   │   │   ├── update-password.dto.ts
│   │   │   ├── telephone.dto.ts
│   │   │   └── address.dto.ts
│   │   ├── guards/         # Auth guards
│   │   │   └── jwt-auth.guard.ts
│   │   ├── decorators/     # Custom decorators
│   │   │   └── current-user.decorator.ts
│   │   ├── auth.controller.ts  # Login, Register
│   │   ├── auth.service.ts
│   │   ├── user.controller.ts  # User profile management
│   │   ├── user.service.ts
│   │   └── auth.module.ts
│   ├── prisma/             # Prisma service
│   ├── zenstack/           # ZenStack service (access control)
│   ├── config/             # Configuration
│   ├── app.module.ts       # Root module
│   └── main.ts             # Entry point
├── storage/
│   └── photo/              # Photo storage (not in git)
│       ├── botanical/
│       ├── still-life/
│       └── portrait/
├── schema.zmodel           # ZenStack schema (source of truth)
├── docker-compose.yml      # Docker services
└── .env                    # Environment variables
```

## License

UNLICENSED
