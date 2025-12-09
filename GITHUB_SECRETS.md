# GitHub Actions Secrets Required

Add these secrets to your GitHub repository settings:
**Settings → Secrets and variables → Actions → New repository secret**

## Required Secrets List:

### 1. **DATABASE_URL_POSTGRES**

- PostgreSQL database connection string
- Format: `postgresql://username:password@host:port/database`
- Example: `postgresql://user:pass@localhost:5432/screenrecord`

### 2. **GOOGLE_CLIENT_ID**

- Google OAuth Client ID for authentication
- Get from: [Google Cloud Console](https://console.cloud.google.com/)

### 3. **GOOGLE_CLIENT_SECRET**

- Google OAuth Client Secret
- Get from: [Google Cloud Console](https://console.cloud.google.com/)

### 4. **NEXT_PUBLIC_BASE_URL**

- Public base URL of your application
- Example: `https://yourdomain.com` or `http://your-vm-ip:3000`

### 5. **ARCJET_API_KEY**

- Arcjet API key for security features (bot protection, rate limiting)
- Get from: [Arcjet Dashboard](https://arcjet.com/)

### 6. **XATA_API_KEY**

- Xata API key for database client
- Get from: [Xata Dashboard](https://xata.io/)

### 7. **BUNNY_VIDEO_LIBRARY_ID**

- Bunny.net Video Library ID
- Get from: [Bunny.net Dashboard](https://bunny.net/)

### 8. **BUNNY_STREAM_ACCESS_KEY**

- Bunny.net Stream API Access Key
- Get from: [Bunny.net Dashboard](https://bunny.net/)

### 9. **BUNNY_STORAGE_ACCESS_KEY**

- Bunny.net Storage API Access Key
- Get from: [Bunny.net Dashboard](https://bunny.net/)

---

## How to Add Secrets:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Enter the **Name** (exactly as listed above)
5. Enter the **Secret** value
6. Click **Add secret**

Repeat for all 9 secrets listed above.
