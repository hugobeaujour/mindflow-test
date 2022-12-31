resource "aws_lambda_function" "update_workflow" {
  s3_bucket     = var.lambda_src_bucket.id
  s3_key        = "Lambdas/${local.package_name}.zip"
  function_name = local.function_name
  role          = aws_iam_role.update_workflow.arn
  handler       = local.handler
  publish       = false
  runtime       = "nodejs14.x"

  tags = {
    Name        = local.package_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Description = "Lambda API for getting workflows"
  }

  environment {
    variables = {
      NODE_OPTIONS = "--enable-source-maps"
      REGION       = var.region
    }
  }

  depends_on = [aws_iam_role.update_workflow]
}

resource "aws_cloudwatch_log_group" "update_workflow" {
  name              = "/aws/lambda/${local.function_name}"
  retention_in_days = 14
}
