# AWS FROM CLICKS TO CODE | Automating EC2 Workshop

> **See the Cloud. Build It. Access It. Automate It.**  
> Official event microsite for the hands-on technical workshop conducted by the **AWS Student Builder Group (AWS SBG)** at **M. H. Saboo Siddik College of Engineering (MHSSCE)**.

---

## Workshop Overview

* **Event**: AWS FROM CLICKS TO CODE - Automating EC2
* **Date**: September 24, 2026
* **Location**: Seminar Hall / Cloud Labs, M. H. Saboo Siddik College of Engineering, Byculla, Mumbai
* **Speaker & Guide**: Afreen Banu (Chief Guest · Speaker · Guide)
* **Organized By**: AWS Student Builder Group (AWS SBG) at MHSSCE

---

## Technical Curriculum Covered

1. **Cloud Computing Fundamentals**: Global AWS infrastructure, Regions, and Availability Zones.
2. **Amazon EC2 Launch Sequence**: AMI selection, instance sizing, and VPC security groups.
3. **AWS Systems Manager (SSM) Session Manager**: Secure, browser-based CLI access without open port 22 or SSH keys.
4. **Apache Web Server Hosting**: Installing `httpd`, configuring firewalls, and hosting custom web apps.
5. **AWS CloudFormation (IaC)**: Automating repeatable multi-tier cloud infrastructure with declarative code.

---

## Tech Stack & Architecture

* **Frontend**: React 19 + Vite 8
* **Styling**: Vanilla CSS with customized AWS Design System Tokens & Dark Mode
* **Typography**: Official Self-Hosted **Amazon Ember** Font Family (Display, Mono, Duospace)
* **Icons**: Lucide React
* **Hosting**: Amazon S3 (Static Website Hosting) + Amazon CloudFront CDN

---

## Getting Started Locally

### Prerequisites
* Node.js 18+ installed

### Installation & Development

```bash
# 1. Clone repository
git clone <YOUR_REPO_URL>
cd "EC2 Workshop"

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

The application will be live at `http://localhost:5173/`.

### Production Build

```bash
npm run build
```
Generates production-optimized bundles in the `dist/` directory.

---

## Deployment to Amazon S3

For complete step-by-step instructions on deploying to Amazon S3:
* Refer to [`S3_DEPLOYMENT_GUIDE.md`](./S3_DEPLOYMENT_GUIDE.md)
* Use [`deploy-s3.ps1`](./deploy-s3.ps1) for 1-click Windows PowerShell deployment
* Use [`s3-bucket-policy.json`](./s3-bucket-policy.json) for bucket public read access

---

## License & Credits

Organized with pride by the **AWS Student Builder Group at MHSSCE**.  
All rights reserved © 2026 AWS SBG MHSSCE.
