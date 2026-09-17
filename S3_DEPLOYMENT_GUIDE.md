# Amazon S3 Deployment Guide: AWS FROM CLICKS TO CODE

This project is built and optimized for static hosting on **Amazon S3** (optionally paired with **Amazon CloudFront** for global CDN speed & SSL/HTTPS).

---

## What is in the `dist` Folder?

The `dist/` directory contains all production-ready assets:
* `index.html` – Main SPA entry point with metadata, OpenGraph tags, JSON-LD schema, and font preloading.
* `error.html` – Fallback error document for SPA routing on S3.
* `favicon.ico` – Tab icon.
* `assets/` – Optimized JS bundle (`index-*.js`), CSS stylesheet (`index-*.css`), and workshop graphics (`brandmark.png`, `program-icon.png`, `afreen_bano.jpg`).
* `fonts/` – Complete self-hosted suite of 14 **Amazon Ember** typography files.

---

## Option 1: Deploy via AWS Management Console (Drag & Drop)

### Step 1: Create an S3 Bucket
1. Log in to the [AWS Management Console](https://console.aws.amazon.com/s3/).
2. Navigate to **S3** and click **Create bucket**.
3. **Bucket name**: Choose a globally unique name (e.g., `awssbg-ec2-workshop-2026`).
4. **AWS Region**: Select your nearest region (e.g., `ap-south-1` for Mumbai, or `us-east-1`).
5. **Block Public Access settings for this bucket**:
   - Uncheck **Block *all* public access**.
   - Check the acknowledgment box ("*I acknowledge that the current settings might result in this bucket and the objects within it becoming public*").
6. Click **Create bucket**.

---

### Step 2: Enable Static Website Hosting
1. Click on your newly created bucket and select the **Properties** tab.
2. Scroll down to the bottom to **Static website hosting** and click **Edit**.
3. Select **Enable**.
4. Set:
   - **Hosting type**: *Host a static website*
   - **Index document**: `index.html`
   - **Error document**: `error.html`
5. Click **Save changes**.
6. Note down the **Bucket website endpoint** URL displayed at the bottom (e.g., `http://awssbg-ec2-workshop-2026.s3-website.ap-south-1.amazonaws.com`).

---

### Step 3: Add the Bucket Policy (Public Read)
1. Select the **Permissions** tab.
2. Under **Bucket policy**, click **Edit**.
3. Paste the following JSON policy (replace `YOUR_BUCKET_NAME` with your actual bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```
4. Click **Save changes**.

---

### Step 4: Upload the `dist/` Folder Contents
1. Select the **Objects** tab in your bucket.
2. Click **Upload**.
3. Open your computer's file explorer to:
   `c:\Users\MOHAMMED\Music\AWS SBG EVENT\EC2 Workshop\dist`
4. **Select all items INSIDE the `dist` folder** (`assets`, `fonts`, `index.html`, `error.html`, `favicon.ico`).
5. Drag and drop them directly into the AWS Console upload area.
   *(Make sure you upload the contents inside `dist`, NOT the `dist` folder itself!)*
6. Click **Upload**.
7. Visit your **Bucket website endpoint** URL in your browser!

---

## Option 2: Deploy via AWS CLI / PowerShell

If you have the AWS CLI installed and configured (`aws configure`), you can deploy directly with one command:

```powershell
.\deploy-s3.ps1 -BucketName "YOUR_BUCKET_NAME" -Region "ap-south-1"
```

Or manually using AWS CLI:
```bash
# 1. Build project
npm run build

# 2. Upload hashed assets with 1-year cache
aws s3 sync dist/ s3://YOUR_BUCKET_NAME/ --exclude "index.html" --exclude "error.html" --cache-control "max-age=31536000,public,immutable" --delete

# 3. Upload HTML documents with no-cache (ensures instant updates on future deploys)
aws s3 cp dist/index.html s3://YOUR_BUCKET_NAME/index.html --cache-control "no-cache, no-store, must-revalidate"
aws s3 cp dist/error.html s3://YOUR_BUCKET_NAME/error.html --cache-control "no-cache, no-store, must-revalidate"
```

---

## (Optional) Step 5: Add CloudFront for HTTPS & Custom Domain

To serve over `https://` with a free SSL certificate:
1. Open the [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/).
2. Click **Create distribution**.
3. In **Origin domain**, choose your S3 website endpoint (or select the S3 bucket and choose "Use website endpoint").
4. Under **Viewer protocol policy**, select **Redirect HTTP to HTTPS**.
5. Click **Create distribution**.
6. Use the generated `*.cloudfront.net` domain or connect your custom domain (Route 53 + AWS Certificate Manager).
