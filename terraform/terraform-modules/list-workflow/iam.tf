resource "aws_iam_role" "list_workflow" {
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

resource "aws_iam_role_policy_attachment" "list_workflow" {
  role       = aws_iam_role.list_workflow.name
  policy_arn = aws_iam_policy.list_workflow.arn
}

resource "aws_iam_role_policy_attachment" "list_workflow_basic" {
  role       = aws_iam_role.list_workflow.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy" "list_workflow" {
  name        = "${local.package_name}-policy"
  path        = "/"
  description = "list_workflow"
  policy      = data.aws_iam_policy_document.list_workflow.json
}

data "aws_iam_policy_document" "list_workflow" {
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

resource "aws_lambda_permission" "list_workflow" {
  statement_id  = "AllowExecutionAPGList"
  action        = "lambda:InvokeFunction"
  function_name = local.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway.execution_arn}/*/*/*"
  depends_on = [
    aws_lambda_function.list_workflow
  ]
}
