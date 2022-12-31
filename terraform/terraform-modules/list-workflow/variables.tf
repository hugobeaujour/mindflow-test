variable "group" {
  description = "Group name"
}

variable "environment" {
  description = "Environment name"
}

variable "region" {
  description = "AWS region"
}

variable "repo" {
  description = "Repo name"
}

variable "lambda_src_bucket" {
  description = "Lambda source bucket"
}

variable "api_gateway" {
  description = "API Gateway Rest API"
}

variable "workflow_resource" {
  description = "API path of workflow"
}

variable "workflows_table" {
  description = "Workflows table"
}
