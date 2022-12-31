variable "environment" {
  description = "Environment to deploy to"
}

variable "region" {
  description = "Region to deploy to"
}

variable "group" {
  description = "Group name of the account"
}

variable "route53_domain" {
  description = "Route53 domain for urls"
}

variable "repo_url" {
  description = "repo URL of the distribution"
}

variable "url" {
  description = "URL of the distribution"
}
