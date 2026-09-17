# deploy-s3.ps1
# Automates building and deploying the workshop microsite to Amazon S3
param (
    [Parameter(Mandatory=$true, HelpMessage="Enter your S3 Bucket name (e.g., awssbg-ec2-workshop)")]
    [string]$BucketName,

    [Parameter(Mandatory=$false)]
    [string]$Region = "us-east-1"
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "AWS SBG - EC2 Workshop S3 Deployment" -ForegroundColor Cyan
Write-Host "Target Bucket: $BucketName ($Region)" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Run Production Build
Write-Host "`n[1/3] Building production assets with Vite..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please check errors above." -ForegroundColor Red
    exit 1
}

# 2. Check AWS CLI
Write-Host "`n[2/3] Checking AWS CLI installation..." -ForegroundColor Yellow
if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
    Write-Host "AWS CLI is not installed or not in PATH." -ForegroundColor Red
    Write-Host "You can drag-and-drop the contents of the 'dist' folder directly into the AWS S3 Console." -ForegroundColor Yellow
    Write-Host "Refer to S3_DEPLOYMENT_GUIDE.md for detailed instructions." -ForegroundColor White
    exit 1
}

# 3. Deploy to S3 with optimal Cache-Control headers
Write-Host "`n[3/3] Syncing 'dist' directory to s3://$BucketName..." -ForegroundColor Green

# Sync hashed immutable assets (JS, CSS, fonts, images) with 1 year cache
aws s3 sync dist/ s3://$BucketName/ --exclude "index.html" --exclude "error.html" --cache-control "max-age=31536000,public,immutable" --delete

# Sync HTML files with no-cache so updates propagate instantly
aws s3 cp dist/index.html s3://$BucketName/index.html --cache-control "no-cache, no-store, must-revalidate"
aws s3 cp dist/error.html s3://$BucketName/error.html --cache-control "no-cache, no-store, must-revalidate"

Write-Host "`n Deployment complete!" -ForegroundColor Green
Write-Host "Website Endpoint: http://$BucketName.s3-website-$Region.amazonaws.com" -ForegroundColor Cyan
