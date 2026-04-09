variable "aws_region" {
  default = "us-west-2"
}

variable "project" {
  default = "prismatic-soul"
}

variable "domain_name" {
  default = "soul.mcnattcloud.com"
}

variable "container_port" {
  default = 3000
}

variable "desired_count" {
  default = 1
}

variable "cpu" {
  default = 256
}

variable "memory" {
  default = 512
}
