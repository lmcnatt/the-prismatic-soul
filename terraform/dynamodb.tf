resource "aws_dynamodb_table" "main" {
  name         = var.project
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "entityType"
  range_key    = "entityId"

  attribute {
    name = "entityType"
    type = "S"
  }

  attribute {
    name = "entityId"
    type = "S"
  }

  tags = { Name = var.project }
}
