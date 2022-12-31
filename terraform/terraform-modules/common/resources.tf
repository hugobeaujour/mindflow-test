# /workflow
resource "aws_api_gateway_resource" "workflow" {
  parent_id   = aws_api_gateway_rest_api.mindflow.root_resource_id
  path_part   = "workflow"
  rest_api_id = aws_api_gateway_rest_api.mindflow.id
}

module "workflow_cors" {
  source  = "squidfunk/api-gateway-enable-cors/aws"
  version = "0.3.3"

  api_id          = aws_api_gateway_rest_api.mindflow.id
  api_resource_id = aws_api_gateway_resource.workflow.id
}

# /workflow/{id}
resource "aws_api_gateway_resource" "workflow_id" {
  parent_id   = aws_api_gateway_resource.workflow.id
  path_part   = "{id}"
  rest_api_id = aws_api_gateway_rest_api.mindflow.id
}

module "workflow_id_cors" {
  source  = "squidfunk/api-gateway-enable-cors/aws"
  version = "0.3.3"

  api_id          = aws_api_gateway_rest_api.mindflow.id
  api_resource_id = aws_api_gateway_resource.workflow_id.id
}

# /workflow/launch
resource "aws_api_gateway_resource" "workflow_launch" {
  parent_id   = aws_api_gateway_resource.workflow.id
  path_part   = "launch"
  rest_api_id = aws_api_gateway_rest_api.mindflow.id
}

module "workflow_launch_cors" {
  source  = "squidfunk/api-gateway-enable-cors/aws"
  version = "0.3.3"

  api_id          = aws_api_gateway_rest_api.mindflow.id
  api_resource_id = aws_api_gateway_resource.workflow_launch.id
}