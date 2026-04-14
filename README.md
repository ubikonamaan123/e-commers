# Multi-Vendor E-Commerce (Node.js + React + Socket.IO)

Ye project aapke requirement ke according banaya gaya starter hai jisme:
- **3 roles**: User, Vendor, Admin
- **Admin control**: category and order visibility
- **Vendor panel**: product add/list/update/delete API support
- **User side**: browse/search/filter products, cart style checkout
- **Realtime chat**: Socket.IO based conversation/message flow
- **Stack**: Node.js (Express), Socket.IO, React (Vite)

## Repo Structure

- `server/` → Node.js backend API + socket server
- `client/` → React frontend

## Quick Start

### 1) Backend start

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend start

```bash
cd client
npm install
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

## Demo Accounts

- Admin: `admin@shop.local` / `admin123`
- Vendor: `vendor@shop.local` / `vendor123`
- User: `user@shop.local` / `user123`

## Important APIs

- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- Products: `/api/products` (+ query `q`, `category`, `vendorId`)
- Categories: `/api/categories`
- Orders: `/api/orders`
- Chats: `/api/chats`, `/api/chats/:id/messages`

## Next recommended upgrades for production

1. MongoDB/PostgreSQL integration (currently in-memory store).
2. Payment gateway (Razorpay/Stripe).
3. Cloud image upload (S3/Cloudinary).
4. Proper chat participant finder + notifications.
5. Elastic/OpenSearch for large catalog search.
6. Docker + CI/CD + tests.

## GitHub push commands

```bash
git init
git add .
git commit -m "feat: multi-vendor ecommerce with chat"
git remote add origin <your-github-repo-url>
git push -u origin main
```
