output "alb_dns" {
  value = aws_lb.main.dns_name
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.main.domain_name
}

output "ecr_repository_url" {
  value = aws_ecr_repository.app.repository_url
}

output "dynamodb_table" {
  value = aws_dynamodb_table.main.name
}

output "s3_bucket" {
  value = aws_s3_bucket.assets.id
}

output "acm_cert_validation_records" {
  value = { for dvo in aws_acm_certificate.cf_cert.domain_validation_options : dvo.domain_name => {
    name  = dvo.resource_record_name
    type  = dvo.resource_record_type
    value = dvo.resource_record_value
  }}
  description = "Add these CNAME records in Namecheap for ACM validation"
}

output "cloudfront_cname_target" {
  value       = aws_cloudfront_distribution.main.domain_name
  description = "Point soul.mcnattcloud.com CNAME to this value in Namecheap"
}
