---
description: Deploy the application to Vercel
---

# Deploy to Vercel

This workflow guides you through deploying the Cine-Track Pro application to Vercel.

## Prerequisites
- Vercel account
- Vercel CLI installed (optional, but recommended for manual deploys)

## Steps

1.  **Install Vercel CLI** (if not already installed)
    ```bash
    npm install -g vercel
    ```

2.  **Login to Vercel**
    ```bash
    vercel login
    ```

3.  **Deploy**
    Run the following command to start the deployment process. You will be prompted to link the project to your Vercel account.
    ```bash
    vercel
    ```
    - Set up and deploy? [Y]
    - Which scope? [Select your account]
    - Link to existing project? [N]
    - Project name? [cine-track-pro]
    - In which directory? [./]
    - Want to modify these settings? [N]

4.  **Environment Variables**
    Vercel will detect that you are using Next.js. However, you MUST configure your environment variables in the Vercel Dashboard or via CLI for the app to work with Supabase.

    **Via CLI (after linking):**
    ```bash
    vercel env add NEXT_PUBLIC_SUPABASE_URL
    # Paste your URL when prompted
    
    vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
    # Paste your Anon Key when prompted
    ```

    **Via Dashboard:**
    - Go to your project settings on Vercel.
    - Navigate to **Environment Variables**.
    - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

5.  **Redeploy (if env vars added after deploy)**
    ```bash
    vercel --prod
    ```
