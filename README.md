# The Prismatic Soul

A D&D campaign companion web application built on AWS with containerized infrastructure.

## Architecture

- **Compute:** AWS ECS Fargate (Node.js/Express)
- **Database:** Amazon DynamoDB (single-table design)
- **CDN:** Amazon CloudFront
- **Static Assets:** Amazon S3
- **Load Balancer:** Application Load Balancer with HTTPS
- **IaC:** Terraform
- **CI/CD:** AWS CodePipeline + CodeBuild
- **Domain:** soul.mcnattcloud.com

## Local Development

```bash
cd app
npm install
node seed.js        # populate DynamoDB
node index.js       # start server on :3000
```

## Docker

```bash
cd app
docker build -t prismatic-soul .
docker run -p 3000:3000 prismatic-soul
```

## Infrastructure

```bash
cd terraform
terraform init
terraform plan
terraform apply
```
