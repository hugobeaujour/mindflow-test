locals {
  package_name  = "getMeResales"
  function_name = "api-${var.repo}-${local.package_name}"
  handler       = "dist/index.handler"
}
