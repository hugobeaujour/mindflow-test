output "api_gateway" {
  value = aws_api_gateway_rest_api.mindflow
}

output "workflows_table" {
  value = aws_dynamodb_table.workflows
}

output "workflow_ressource" {
  value = aws_api_gateway_resource.workflow
}

output "workflow_id_ressource" {
  value = aws_api_gateway_resource.workflow_id
}

output "workflow_launch_ressource" {
  value = aws_api_gateway_resource.workflow_launch
}

