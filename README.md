# Mindflow-test

API base url : `YO`

## Deploy

Be sure to have upload your lambda code in the S3 bucket before everything

Go in /terraform/dev run `terraform init` then `terraform apply` and wait for completion

When apply is done, be sure to deploy the frontend

## Run

in /frontend `npm ci` then `npm run start` will be enough

## Structures

### Workflow

```js
{

}
```

## API

### Get Workflow

GET `/v1/workflow`

Doesn't require any parameter or body

Returns a 200 with the workflow

### Update Workflow

PUT `/v1/workflow`

Requires the full workflow in an object

```js
{
    workflow: WORKFLOW
}
```

Returns a 200 and the new workflow if it was well updated

#### 200
```js
{
    workflow: WORKFLOW
}
```

### Launch Workflow

POST `/v1/workflow/launch`

Doesn't require any parameter or body

Returns a 200 if it started as expected