module "common" {
  source           = "../terraform-modules/common"
  environment      = local.environment
  repo             = local.repo
  region           = local.region
  group            = local.group
  api_version      = "v1"
}

module "frontend" {
  source         = "../terraform-modules/frontend"
  environment    = local.environment
  region         = local.region
  group          = local.group
  route53_domain = data.aws_route53_zone.mindflow_test
  url            = local.frontend_url
}

module "api_get_workflow" {
  source                = "../terraform-modules/get-workflow"
  environment           = local.environment
  region                = local.region
  group                 = local.group
  repo                  = local.repo
  lambda_src_bucket     = data.aws_s3_bucket.code_zips
  api_gateway           = module.common.api_gateway
  workflow_id_resource  = module.common.workflow_id_resource
  workflows_table       = module.common.workflows_table

  depends_on = [
    module.common
  ]
}

module "api_list_workflow" {
  source              = "../terraform-modules/list-workflows"
  environment         = local.environment
  region              = local.region
  group               = local.group
  repo                = local.repo
  lambda_src_bucket   = data.aws_s3_bucket.code_zips
  api_gateway         = module.common.api_gateway
  workflow_resource   = module.common.workflow_resource
  workflows_table     = module.common.workflows_table

  depends_on = [
    module.common
  ]
}

module "api_update_workflow" {
  source              = "../terraform-modules/update-workflow"
  environment         = local.environment
  region              = local.region
  group               = local.group
  repo                = local.repo
  lambda_src_bucket   = data.aws_s3_bucket.code_zips
  api_gateway         = module.common.api_gateway
  workflow_resource   = module.common.workflow_resource
  workflows_table     = module.common.workflows_table

  depends_on = [
    module.common
  ]
}

module "api_launch_workflow" {
  source                    = "../terraform-modules/launch-workflow"
  environment               = local.environment
  region                    = local.region
  group                     = local.group
  repo                      = local.repo
  lambda_src_bucket         = data.aws_s3_bucket.code_zips
  api_gateway               = module.common.api_gateway
  workflow_launch_resource  = module.common.workflow_launch_resource
  workflows_table           = module.common.workflows_table

  depends_on = [
    module.common
  ]
}