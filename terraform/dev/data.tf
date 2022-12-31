data "aws_s3_bucket" "code_zips" {
  bucket = "code-zips-bucket-${local.environment}"
}

data "aws_route53_zone" "minflow_test" {
  name         = local.route53_zone
  private_zone = false
}