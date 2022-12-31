locals {
  bucket_name_base = "mindflow-test"
  bucket_name      = "${var.group}-${local.bucket_name_base}-${var.environment}"
  s3_origin_id     = "S3-${local.bucket_name_base}"
}
