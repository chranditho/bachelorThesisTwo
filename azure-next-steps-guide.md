# ConIdea Azure Deployment - Next Steps Guide

This guide provides detailed instructions for completing the deployment of the ConIdea distributed system to Microsoft Azure. It builds upon the deployment plan and summary documents already created.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Code Preparation](#code-preparation)
3. [CI/CD Pipeline Setup](#cicd-pipeline-setup)
4. [Infrastructure Deployment](#infrastructure-deployment)
5. [Application Deployment](#application-deployment)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Monitoring and Alerting Setup](#monitoring-and-alerting-setup)
8. [Troubleshooting](#troubleshooting)
9. [Maintenance and Updates](#maintenance-and-updates)
10. [Additional Resources](#additional-resources)

## Prerequisites

Before proceeding with the deployment, ensure you have the following:

- **Azure Account**: Active Azure subscription with sufficient permissions
- **Development Environment**:
  - Node.js (v18 or later)
  - Angular CLI
  - Azure CLI (latest version)
- **Source Code**: Access to the ConIdea repository
- **Azure DevOps or GitHub**: For setting up CI/CD pipelines

## Code Preparation

1. **Finalize Code Changes**:

   - Verify all environment configuration files are correctly set up
   - Ensure all hardcoded URLs have been replaced with environment variables
   - Run local tests to confirm the application works with the new configuration

2. **Create Deployment Branches**:
   - Create a `staging` branch for initial deployment testing
   - Ensure the `main` branch is ready for production deployment

## CI/CD Pipeline Setup

### Azure DevOps Pipeline

1. **Create a New Project**:

   - Sign in to Azure DevOps
   - Create a new project or use an existing one
   - Import the ConIdea repository

2. **Create Build Pipelines**:

   a. **Frontend Pipeline (conidea-ui)**:

   ```yaml
   # azure-pipelines-frontend.yml
   trigger:
     branches:
       include:
         - main
         - staging
     paths:
       include:
         - 'apps/conidea-ui/**'

   pool:
     vmImage: 'ubuntu-latest'

   steps:
     - task: NodeTool@0
       inputs:
         versionSpec: '18.x'
       displayName: 'Install Node.js'

     - script: |
         npm install
         npm run build -- --prod
       displayName: 'Build Frontend'

     - task: CopyFiles@2
       inputs:
         sourceFolder: 'dist/apps/conidea-ui'
         contents: '**'
         targetFolder: '$(Build.ArtifactStagingDirectory)'
       displayName: 'Copy Build Files'

     - task: PublishBuildArtifacts@1
       inputs:
         pathToPublish: '$(Build.ArtifactStagingDirectory)'
         artifactName: 'frontend'
       displayName: 'Publish Frontend Artifact'
   ```

   b. **Backend Pipelines (for each service)**:

   ```yaml
   # azure-pipelines-backend.yml
   trigger:
     branches:
       include:
         - main
         - staging
     paths:
       include:
         - 'apps/conidea-api/**'
         - 'apps/ideas-api/**'
         - 'apps/users-api/**'

   pool:
     vmImage: 'ubuntu-latest'

   steps:
     - task: NodeTool@0
       inputs:
         versionSpec: '18.x'
       displayName: 'Install Node.js'

     - script: |
         npm install
       displayName: 'Install Dependencies'

     - task: CopyFiles@2
       inputs:
         contents: |
           apps/**
           libs/**
           package.json
           nx.json
           tsconfig.base.json
         targetFolder: '$(Build.ArtifactStagingDirectory)'
       displayName: 'Copy Source Files'

     - task: PublishBuildArtifacts@1
       inputs:
         pathToPublish: '$(Build.ArtifactStagingDirectory)'
         artifactName: 'backend'
       displayName: 'Publish Backend Artifact'
   ```

3. **Create Release Pipelines**:

   a. **Frontend Release**:

   - Create a new release pipeline
   - Add the frontend artifact
   - Add an Azure Static Web App deployment task
   - Configure environment-specific variables

   b. **Backend Release**:

   - Create a new release pipeline
   - Add the backend artifact
   - Add Azure App Service deployment tasks for each service
   - Configure environment-specific variables

### GitHub Actions Alternative

If using GitHub instead of Azure DevOps, create the following workflow files:

1. **Frontend Workflow**:

```yaml
# .github/workflows/frontend.yml
name: Frontend CI/CD

on:
  push:
    branches: [main, staging]
    paths:
      - 'apps/conidea-ui/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build -- --prod

      - name: Deploy to Azure Static Web App
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          app_location: '/'
          api_location: 'api'
          output_location: 'dist/apps/conidea-ui'
```

2. **Backend Workflow**:

```yaml
# .github/workflows/backend.yml
name: Backend CI/CD

on:
  push:
    branches: [main, staging]
    paths:
      - 'apps/conidea-api/**'
      - 'apps/ideas-api/**'
      - 'apps/users-api/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Deploy to Azure Web App - conidea-api
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'conidea-api'
          publish-profile: ${{ secrets.CONIDEA_API_PUBLISH_PROFILE }}
          package: .

      - name: Deploy to Azure Web App - ideas-api
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'ideas-api'
          publish-profile: ${{ secrets.IDEAS_API_PUBLISH_PROFILE }}
          package: .

      - name: Deploy to Azure Web App - users-api
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'users-api'
          publish-profile: ${{ secrets.USERS_API_PUBLISH_PROFILE }}
          package: .
```

## Infrastructure Deployment

1. **Prepare Azure CLI**:

   ```bash
   # Login to Azure
   az login

   # Set the subscription
   az account set --subscription <subscription-id>
   ```

2. **Deploy Infrastructure**:

   ```bash
   # Make the deployment script executable
   chmod +x azure-deploy.sh

   # Run the deployment script
   ./azure-deploy.sh
   ```

3. **Verify Resource Creation**:
   - Check the Azure Portal to ensure all resources are created
   - Verify resource configurations match the expected settings

## Application Deployment

1. **Initial Manual Deployment**:

   a. **Backend Services**:

   ```bash
   # Build the backend services
   npm run build -- conidea-api
   npm run build -- ideas-api
   npm run build -- users-api

   # Deploy to Azure App Services
   az webapp deployment source config-zip --resource-group conidea-rg --name conidea-api --src dist/apps/conidea-api.zip
   az webapp deployment source config-zip --resource-group conidea-rg --name ideas-api --src dist/apps/ideas-api.zip
   az webapp deployment source config-zip --resource-group conidea-rg --name users-api --src dist/apps/users-api.zip
   ```

   b. **Frontend**:

   ```bash
   # Build the frontend
   npm run build -- conidea-ui --prod

   # Deploy to Azure Static Web App
   az staticwebapp deploy --name conidea-ui --source dist/apps/conidea-ui
   ```

2. **Trigger CI/CD Pipelines**:
   - Push changes to the repository to trigger the CI/CD pipelines
   - Monitor the pipeline execution in Azure DevOps or GitHub Actions

## Post-Deployment Verification

1. **Verify Service Health**:

   - Check the status of all deployed services in Azure Portal
   - Verify that all services are running without errors

2. **Test API Endpoints**:

   - Use tools like Postman or curl to test the API endpoints
   - Verify that the API returns the expected responses

3. **Test Frontend**:

   - Access the frontend URL and verify that it loads correctly
   - Test all major functionality to ensure it works as expected

4. **Check Logs**:
   - Review application logs in Azure App Service
   - Check for any errors or warnings

## Monitoring and Alerting Setup

1. **Configure Application Insights**:

   - Verify that Application Insights is collecting data
   - Set up custom events and metrics for important operations

2. **Create Dashboards**:

   ```bash
   # Create a dashboard for monitoring
   az portal dashboard create --resource-group conidea-rg --name ConIdeaDashboard --location eastus --input-path dashboard-template.json
   ```

3. **Set Up Alerts**:

   - Create alerts for critical metrics:
     - High CPU/memory usage
     - Error rate thresholds
     - Response time thresholds
   - Configure notification channels (email, SMS, etc.)

4. **Log Analytics**:
   - Set up Log Analytics workspace
   - Create custom queries for important log patterns
   - Configure log retention policies

## Troubleshooting

### Common Issues and Solutions

1. **Connection Issues**:

   - **Problem**: Services cannot connect to MongoDB or RabbitMQ
   - **Solution**: Verify connection strings in App Service configuration

2. **CORS Errors**:

   - **Problem**: Frontend cannot access backend APIs due to CORS
   - **Solution**: Check CORS configuration in the backend services

3. **Deployment Failures**:

   - **Problem**: CI/CD pipeline fails during deployment
   - **Solution**: Check build logs for errors, verify service principal permissions

4. **Performance Issues**:
   - **Problem**: Slow response times
   - **Solution**: Check App Service plan tier, consider scaling up or out

### Diagnostic Commands

```bash
# Check application logs
az webapp log tail --name conidea-api --resource-group conidea-rg

# Get deployment history
az webapp deployment list --name conidea-api --resource-group conidea-rg

# Check application settings
az webapp config appsettings list --name conidea-api --resource-group conidea-rg
```

## Maintenance and Updates

1. **Regular Updates**:

   - Schedule regular updates for dependencies
   - Test updates in a staging environment before production

2. **Backup Strategy**:

   - Configure automated backups for Cosmos DB
   - Document restore procedures

3. **Scaling Plan**:
   - Monitor usage patterns
   - Create a scaling plan based on observed patterns
   - Configure auto-scaling rules

## Additional Resources

- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Azure Cosmos DB Documentation](https://docs.microsoft.com/en-us/azure/cosmos-db/)
- [Azure Service Bus Documentation](https://docs.microsoft.com/en-us/azure/service-bus-messaging/)
- [Azure DevOps Documentation](https://docs.microsoft.com/en-us/azure/devops/)
- [Application Insights Documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)
- [Azure CLI Reference](https://docs.microsoft.com/en-us/cli/azure/)
