resource "aws_dynamodb_table" "workflows" {
  name         = "Workflows"
  hash_key     = "userId"
  range_key    = "id"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Name        = "Workflows"
    Group       = var.group
    Environment = var.environment
  }
}

// ! definitely wrong because with this model it will accept only one
// was missing time to find right way to check for all inside the object

resource "aws_api_gateway_model" "action" {
  rest_api_id  = aws_api_gateway_rest_api.mindflow.id
  name         = "Action"
  content_type = "application/json"
  schema       = data.template_file.action.rendered

  depends_on = [
    aws_api_gateway_model.action
  ]
}

data "template_file" "action" {
  template = file("${path.module}/models/action.json")

  vars = {
    api_id = aws_api_gateway_rest_api.mindflow.id
  }
}

resource "aws_api_gateway_model" "workflow" {
  rest_api_id  = aws_api_gateway_rest_api.mindflow.id
  name         = "Workflow"
  content_type = "application/json"
  schema       = data.template_file.workflow.rendered

  depends_on = [
    aws_api_gateway_model.workflow
  ]
}

data "template_file" "workflow" {
  template = file("${path.module}/models/workflow.json")

  vars = {
    api_id = aws_api_gateway_rest_api.mindflow.id
  }
}

resource "aws_api_gateway_model" "update_workflow" {
  rest_api_id  = aws_api_gateway_rest_api.mindflow.id
  name         = "updateWorkflow"
  content_type = "application/json"
  schema       = data.template_file.update_workflow.rendered

  depends_on = [
    aws_api_gateway_model.update_workflow
  ]
}

data "template_file" "update_workflow" {
  template = file("${path.module}/models/update-workflow.json")

  vars = {
    api_id = aws_api_gateway_rest_api.mindflow.id
  }
}
