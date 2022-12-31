resource "aws_iam_role" "update_workflow" {
  name               = "${local.function_name}-execution-role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "update_workflow" {
  role       = aws_iam_role.update_workflow.name
  policy_arn = aws_iam_policy.update_workflow.arn
}

resource "aws_iam_role_policy_attachment" "update_workflow_basic" {
  role       = aws_iam_role.update_workflow.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy" "update_workflow" {
  name        = "${local.package_name}-policy"
  path        = "/"
  description = "update_workflow"
  policy      = data.aws_iam_policy_document.update_workflow.json
}

data "aws_iam_policy_document" "update_workflow" {
  statement {
    sid    = "AllowDynamoResales"
    effect = "Allow"
    resources = [
      var.workflows_table.arn,
      "${var.workflows_table.arn}/*",
    ]
    actions = [
      "dynamodb:Query"
    ]
  }
}

resource "aws_lambda_permission" "update_workflow" {
  statement_id  = "AllowExecutionAPGList"
  action        = "lambda:InvokeFunction"
  function_name = local.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway.execution_arn}/*/*/*"
  depends_on = [
    aws_lambda_function.update_workflow
  ]
}
