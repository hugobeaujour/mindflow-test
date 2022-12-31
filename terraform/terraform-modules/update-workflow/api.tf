resource "aws_api_gateway_method" "update_workflow" {
  rest_api_id    = var.api_gateway.id
  resource_id    = var.workflow_resource.id
  operation_name = "updateWorkflow"
  http_method    = "POST"
  authorization  = "CUSTOM"
  request_models = {
    "application/json" = "updateWorkflow"
  }
  request_validator_id = "tmp"
}

resource "aws_api_gateway_integration" "update_workflow" {
  rest_api_id             = var.api_gateway.id
  resource_id             = var.workflow_resource.id
  http_method             = aws_api_gateway_method.update_workflow.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.update_workflow.invoke_arn
  depends_on = [
    aws_api_gateway_method.update_workflow,
    aws_lambda_function.update_workflow
  ]
}

resource "aws_api_gateway_method_response" "update_workflow" {
  rest_api_id = var.api_gateway.id
  resource_id = var.workflow_resource.id
  http_method = aws_api_gateway_method.update_workflow.http_method
  status_code = "200"
  depends_on = [
    aws_api_gateway_method.update_workflow
  ]
}
