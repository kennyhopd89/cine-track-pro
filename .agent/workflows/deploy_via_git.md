---
description: Deploy to Vercel via Git
---

# Deploy to Vercel (Git Integration)

This workflow guides you through deploying the Cine-Track Pro application by pushing to Git and connecting Vercel.

## Steps

1.  **Initialize Git** (if not already done)
    ```bash
    git init
    git add .
    git commit -m "Initial commit: Cine-Track Pro v1.0"
    ```

2.  **Create a Remote Repository**
    - Go to GitHub/GitLab/Bitbucket and create a new empty repository.
    - Copy the remote URL.

3.  **Push to Remote**
    ```bash
    git remote add origin <YOUR_REMOTE_URL>
    git branch -M main
    git push -u origin main
    ```

4.  **Connect Vercel**
    - Go to [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **"Add New..."** -> **"Project"**.
    - Import your Git repository.
    - **IMPORTANT**: In the "Environment Variables" section, add:
        - `NEXT_PUBLIC_SUPABASE_URL`
        - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
        (Get these from your `.env.local` file)
    - Click **"Deploy"**.

5.  **Updates**
    - Any future commits pushed to the `main` branch will automatically trigger a new deployment on Vercel.
