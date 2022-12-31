resource "aws_api_gateway_rest_api" "mindflow" {
  name = "mindflow"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_resource" "mindflow_base" {
  rest_api_id = aws_api_gateway_rest_api.mindflow.id
  parent_id   = aws_api_gateway_rest_api.mindflow.root_resource_id
  path_part   = "base"
}

resource "aws_api_gateway_method" "mindflow_base" {
  rest_api_id   = aws_api_gateway_rest_api.mindflow.id
  resource_id   = aws_api_gateway_resource.mindflow_base.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "mindflow_base" {
  rest_api_id          = aws_api_gateway_rest_api.mindflow.id
  resource_id          = aws_api_gateway_resource.mindflow_base.id
  http_method          = aws_api_gateway_method.mindflow_base.http_method
  type                 = "MOCK"
  cache_namespace      = "foobar"
  timeout_milliseconds = 29000

  request_parameters = {
    "integration.request.header.X-Authorization" = "'static'"
  }

  request_templates = {
    "application/xml" = <<EOF
{
   "body" : $input.json('$')
}
EOF
  }
}

module "acm" {
  source  = "terraform-aws-modules/acm/aws"
  version = "~> 3.0"

  domain_name = var.api_domain
  zone_id     = var.route53_domain.zone_id

  wait_for_validation = true

  tags = {
    Name = var.api_domain
  }
}

resource "aws_api_gateway_domain_name" "mindflow" {
  domain_name              = var.api_domain
  regional_certificate_arn = module.acm.acm_certificate_arn

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_route53_record" "mindflow" {
  name    = aws_api_gateway_domain_name.mindflow.domain_name
  type    = "A"
  zone_id = var.route53_domain.id

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.mindflow.regional_domain_name
    zone_id                = aws_api_gateway_domain_name.mindflow.regional_zone_id
  }

  depends_on = [
    aws_api_gateway_domain_name.mindflow
  ]
}

resource "aws_api_gateway_deployment" "mindflow" {
  rest_api_id = aws_api_gateway_rest_api.mindflow.id

  triggers = {
    redeployment = sha1(jsonencode(var.api_version))
  }

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [
    aws_api_gateway_method.mindflow_base,
    aws_api_gateway_integration.mindflow_base
  ]
}

resource "aws_api_gateway_stage" "mindflow" {
  deployment_id = aws_api_gateway_deployment.mindflow.id
  rest_api_id   = aws_api_gateway_rest_api.mindflow.id
  stage_name    = var.api_version

  lifecycle {
    ignore_changes = [
      deployment_id
    ]
  }
}

resource "aws_api_gateway_base_path_mapping" "mindflow" {
  api_id      = aws_api_gateway_rest_api.mindflow.id
  stage_name  = aws_api_gateway_stage.mindflow.stage_name
  domain_name = aws_api_gateway_domain_name.mindflow.domain_name
  base_path   = var.api_version
}

resource "aws_api_gateway_request_validator" "mindflow_body" {
  name                  = "mindflow-body-validator"
  rest_api_id           = aws_api_gateway_rest_api.mindflow.id
  validate_request_body = true
}
