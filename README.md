# Photoseller Monorepo

Một monorepo full-stack cho Photoseller - nền tảng thương mại điện tử bán ảnh được xây dựng với các công nghệ web hiện đại.

## Tổng Quan Dự Án

Photoseller là một nền tảng thương mại điện tử toàn diện để mua và bán ảnh. Monorepo này chứa toàn bộ ngăn xếp ứng dụng bao gồm API backend, ứng dụng web frontend, và các tiện ích chia sẻ.

## Cơ Cấu Là Gì?

### Các Ứng Dụng

- **`apps/backend`** - Máy chủ API NestJS
  - API RESTful để quản lý ảnh, xác thực và giao dịch
  - Cơ sở dữ liệu: MariaDB với Prisma ORM
  - Xác thực: Xác thực dựa trên JWT
  - Kiểm soát truy cập với ZenStack

- **`apps/frontend`** - Ứng dụng web Next.js
  - Giao diện người dùng React hiện đại với TypeScript
  - Các tính năng thương mại điện tử (danh sách sản phẩm, bộ sưu tập, giỏ hàng)
  - Xác thực người dùng (đăng nhập, đăng ký)
  - Hỗ trợ đa ngôn ngữ
  - Thiết kế responsive

### Các Gói (Thư Viện Chia Sẻ)

- **`packages/ui`** - Thư viện thành phần React chia sẻ
  - Các thành phần giao diện tái sử dụng
  - Sử dụng bởi ứng dụng frontend

- **`packages/eslint-config`** - Các cài đặt ESLint
  - Cấu hình cơ bản
  - Cấu hình Next.js
  - Cấu hình React

- **`packages/typescript-config`** - Các cấu hình TypeScript
  - Cấu hình cơ bản
  - Cấu hình Next.js
  - Cấu hình thư viện React

## Yêu Cầu Hệ Thống

- **Node.js** phiên bản 18+ hoặc 20+
- **pnpm** phiên bản 8+ (trình quản lý gói)
- **Docker & Docker Compose** (cho cơ sở dữ liệu)
- **Git** phiên bản 2.0+

## Hướng Dẫn Bắt Đầu Nhanh

### 1. Cài đặt các phụ thuộc

```bash
pnpm install
```

### 2. Thiết lập biến môi trường

Backend (`apps/backend/.env`):
```bash
DATABASE_URL="mysql://user:password@localhost:3306/photoseller"
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="24h"
```

Frontend (`apps/frontend/.env.local`):
```bash
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 3. Khởi động cơ sở dữ liệu

```bash
cd apps/backend
docker-compose up -d
```

### 4. Chạy các migration cơ sở dữ liệu

```bash
pnpm -F backend db:migrate
```

### 5. Khởi động các máy chủ phát triển

```bash
pnpm dev
```

Cách này sẽ khởi động:
- Frontend trên `http://localhost:3001`
- Backend API trên `http://localhost:3000`

## Cơ Cấu Dự Án

```
photoseller-monorepo/
├── apps/
│   ├── backend/          # API NestJS
│   │   ├── src/
│   │   ├── prisma/       # Lược đồ cơ sở dữ liệu & migration
│   │   └── docker/       # Cấu hình Docker
│   └── frontend/         # Ứng dụng web Next.js
│       ├── app/          # Định tuyến ứng dụng Next.js
│       ├── components/   # Các thành phần React
│       └── lib/          # Tiện ích & trợ giúp
├── packages/
│   ├── ui/               # Các thành phần giao diện chia sẻ
│   ├── eslint-config/    # Các cài đặt ESLint
│   └── typescript-config/ # Các cấu hình TypeScript
├── package.json          # Thư mục gốc workspace
├── pnpm-workspace.yaml   # Cấu hình workspace pnpm
├── turbo.json            # Cấu hình build Turbo
└── README.md             # Tệp này
```

## Các Lệnh Sẵn Có

### Phát Triển

```bash
# Khởi động tất cả các ứng dụng ở chế độ phát triển
pnpm dev

# Khởi động ứng dụng cụ thể
pnpm dev -F backend
pnpm dev -F frontend
```

### Xây Dựng

```bash
# Xây dựng tất cả các ứng dụng và gói
pnpm build

# Xây dựng ứng dụng cụ thể
pnpm build -F backend
pnpm build -F frontend
```

### Kiểm Tra Linting & Định Dạng

```bash
# Chạy ESLint
pnpm lint

# Định dạng mã với Prettier
pnpm format

# Kiểm tra kiểu dáng mã
pnpm check-format
```

### Cơ Sở Dữ Liệu

```bash
# Chạy migration
pnpm -F backend db:migrate

# Seed cơ sở dữ liệu
pnpm -F backend db:seed

# Đặt lại cơ sở dữ liệu
pnpm -F backend db:reset
```

## Docker & Triển Khai

### Xây dựng các hình ảnh Docker

```bash
# Hình ảnh backend
docker build -t photoseller-backend apps/backend

# Hình ảnh frontend
docker build -t photoseller-frontend apps/frontend
```

### Chạy với Docker Compose

Xem `apps/backend/docker-compose.yml` để cấu hình phát triển cục bộ.

## Công Nghệ Sử Dụng

### Backend
- **Runtime**: Node.js
- **Framework**: NestJS
- **Cơ sở dữ liệu**: MariaDB
- **ORM**: Prisma
- **Kiểm soát truy cập**: ZenStack
- **Ngôn ngữ**: TypeScript

### Frontend
- **Framework**: Next.js 14+
- **Thư viện giao diện**: React 18+
- **Định kiểu**: Tailwind CSS
- **Thư viện thành phần**: Ant Design
- **Ngôn ngữ**: TypeScript

### Monorepo
- **Trình quản lý Workspace**: pnpm
- **Công cụ xây dựng**: Turbo
- **Linter**: ESLint
- **Formatter**: Prettier

## Quy Trình Phát Triển

1. Tạo một nhánh mới cho tính năng của bạn
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Thực hiện các thay đổi trong ứng dụng/gói liên quan

3. Kiểm tra các thay đổi của bạn
   ```bash
   pnpm test
   ```

4. Commit các thay đổi của bạn
   ```bash
   git add .
   git commit -m "feat: mô tả các thay đổi"
   ```

5. Push lên remote
   ```bash
   git push origin feature/your-feature-name
   ```

6. Tạo một Pull Request

## Xử Lý Sự Cố

### Cổng đã được sử dụng
- Frontend: Thay đổi cổng trong `apps/frontend/next.config.ts`
- Backend: Đặt biến môi trường `PORT`

### Sự cố kết nối cơ sở dữ liệu
- Đảm bảo Docker đang chạy: `docker-compose up -d`
- Kiểm tra thông tin xác thực cơ sở dữ liệu trong `.env`
- Chạy migration: `pnpm -F backend db:migrate`

### Sự cố về phụ thuộc
- Xóa cache: `pnpm store prune`
- Cài đặt lại: `pnpm install --force`

## Giấy Phép

[Thêm giấy phép của bạn ở đây]

## Đóng Góp

Chúng tôi hoan nghênh các đóng góp! Vui lòng tuân theo quy trình phát triển ở trên.

Đối với các sự cố và yêu cầu tính năng, vui lòng tạo một issue trên GitHub.

```sh
npx turbo dev --filter=web
pnpm exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
pnpm exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
pnpm exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
