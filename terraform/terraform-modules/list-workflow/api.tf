resource "aws_api_gateway_method" "list_workflow" {
  rest_api_id    = var.api_gateway.id
  resource_id    = var.workflow_resource.id
  operation_name = "listWorkflow"
  authorization  = "CUSTOM"
  http_method    = "GET"
}

resource "aws_api_gateway_integration" "list_workflow" {
  rest_api_id             = var.api_gateway.id
  resource_id             = var.workflow_resource.id
  http_method             = aws_api_gateway_method.list_workflow.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.list_workflow.invoke_arn
  depends_on = [
    aws_api_gateway_method.list_workflow,
    aws_lambda_function.list_workflow
  ]
}

resource "aws_api_gateway_method_response" "list_workflow" {
  rest_api_id = var.api_gateway.id
  resource_id = var.workflow_resource.id
  http_method = aws_api_gateway_method.list_workflow.http_method
  status_code = "200"
  depends_on = [
    aws_api_gateway_method.list_workflow
  ]
}
