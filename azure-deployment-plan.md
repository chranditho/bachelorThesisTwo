# Azure Deployment Plan for ConIdea Distributed System

## System Architecture Overview

The ConIdea system consists of the following components:

1. **Frontend Application**:
   - Angular-based UI (conidea-ui)
   - Communicates with backend API via HTTP

2. **API Gateway**:
   - NestJS application (conidea-api)
   - Exposes HTTP endpoints for the frontend
   - Communicates with microservices via RabbitMQ

3. **Microservices**:
   - ideas-api: Handles idea management functionality
   - users-api: Handles user management functionality
   - Both use MongoDB for data storage
   - Both communicate via RabbitMQ

4. **Infrastructure Dependencies**:
   - MongoDB database
   - RabbitMQ message broker

## Azure Resources Required

### 1. Compute Resources

#### Option A: Azure App Service
- **conidea-ui**: Azure Static Web App
- **conidea-api**: Azure App Service (Standard tier)
- **ideas-api**: Azure App Service (Standard tier)
- **users-api**: Azure App Service (Standard tier)

#### Option B: Azure Kubernetes Service (AKS)
- Single AKS cluster with separate deployments for each service
- Better for scaling and management of microservices
- Recommended for production deployment

### 2. Database
- **Azure Cosmos DB with MongoDB API**
  - Fully managed MongoDB-compatible database
  - Automatic scaling and high availability
  - Geo-replication options for global deployments

### 3. Message Queue
- **Azure Service Bus**
  - Managed message broker service
  - AMQP protocol support (compatible with RabbitMQ clients)
  - Enterprise-grade reliability and scalability

### 4. Networking
- **Azure Virtual Network**
  - Secure communication between services
  - Network security groups to control traffic
- **Azure Front Door**
  - Global load balancing and SSL termination
  - Web Application Firewall (WAF) protection

### 5. DevOps and Monitoring
- **Azure DevOps**
  - CI/CD pipelines for automated deployment
  - Source code management
- **Azure Monitor**
  - Application Insights for performance monitoring
  - Log Analytics for centralized logging
- **Azure Key Vault**
  - Secure storage for connection strings and secrets

## Configuration Changes Required

### 1. Environment Variables

The following environment variables need to be configured in each service:

#### conidea-api
```
PORT=8080
MONGODB_URI=<Azure Cosmos DB connection string>
RMQ=<Azure Service Bus connection string>
```

#### ideas-api and users-api
```
MONGODB_URI=<Azure Cosmos DB connection string>
RMQ=<Azure Service Bus connection string>
```

#### conidea-ui
Create an environment.ts file with:
```typescript
export const environment = {
  production: true,
  apiUrl: '<Azure App Service URL>/api'
};
```

### 2. Code Changes

1. **Frontend (conidea-ui)**:
   - Update service files to use environment configuration instead of hardcoded URLs
   - Add environment.ts and environment.prod.ts files

2. **Backend Services**:
   - Update MongoDB connection strings to use environment variables
   - Update RabbitMQ configuration to use Azure Service Bus
   - Configure CORS to allow requests from the deployed frontend URL

## Deployment Steps

### 1. Infrastructure Setup

1. Create Azure Resource Group
   ```bash
   az group create --name conidea-rg --location eastus
   ```

2. Deploy Azure Cosmos DB
   ```bash
   az cosmosdb create --name conidea-db --resource-group conidea-rg --kind MongoDB
   ```

3. Deploy Azure Service Bus
   ```bash
   az servicebus namespace create --name conidea-servicebus --resource-group conidea-rg --sku Standard
   az servicebus queue create --name ideas_queue --namespace-name conidea-servicebus --resource-group conidea-rg
   ```

4. Deploy App Services (if using Option A)
   ```bash
   az appservice plan create --name conidea-plan --resource-group conidea-rg --sku S1
   az webapp create --name conidea-api --resource-group conidea-rg --plan conidea-plan --runtime "NODE:18-lts"
   az webapp create --name ideas-api --resource-group conidea-rg --plan conidea-plan --runtime "NODE:18-lts"
   az webapp create --name users-api --resource-group conidea-rg --plan conidea-plan --runtime "NODE:18-lts"
   ```

5. Deploy Static Web App (for frontend)
   ```bash
   az staticwebapp create --name conidea-ui --resource-group conidea-rg --location eastus
   ```

### 2. CI/CD Pipeline Setup

1. Create Azure DevOps project
2. Set up build pipelines for each service
3. Configure release pipelines to deploy to Azure resources
4. Set up environment variables in Azure DevOps

### 3. Application Deployment

1. Update code with environment configurations
2. Push changes to repository
3. Trigger CI/CD pipeline to build and deploy services
4. Verify deployment and test functionality

## Scaling Considerations

1. **Horizontal Scaling**:
   - App Services: Configure auto-scaling based on CPU/memory usage
   - AKS: Configure Horizontal Pod Autoscaler (HPA)

2. **Database Scaling**:
   - Cosmos DB: Adjust RU/s (Request Units) based on workload
   - Consider sharding for very large datasets

3. **Message Queue Scaling**:
   - Service Bus: Adjust messaging units based on throughput requirements
   - Consider partitioned queues for high-throughput scenarios

## Monitoring and Operations

1. **Application Monitoring**:
   - Set up Application Insights for all services
   - Configure alerts for critical metrics

2. **Infrastructure Monitoring**:
   - Azure Monitor for resource utilization
   - Set up dashboards for key performance indicators

3. **Backup and Disaster Recovery**:
   - Configure automated backups for Cosmos DB
   - Implement geo-replication for critical data
   - Document recovery procedures

## Security Considerations

1. **Authentication and Authorization**:
   - Implement Azure AD for service-to-service authentication
   - Use Managed Identities where possible

2. **Network Security**:
   - Configure Network Security Groups
   - Use Private Endpoints for Azure services
   - Implement Web Application Firewall

3. **Data Security**:
   - Enable encryption at rest and in transit
   - Store secrets in Azure Key Vault

## Cost Optimization

1. **Resource Sizing**:
   - Start with appropriate sizing based on expected load
   - Monitor usage and adjust accordingly

2. **Reserved Instances**:
   - Consider reserved instances for predictable workloads

3. **Dev/Test Environments**:
   - Use lower-tier resources for non-production environments
   - Implement auto-shutdown for dev/test resources during off-hours

## Next Steps

1. Implement the necessary code changes to support Azure deployment
2. Set up the Azure infrastructure using ARM templates or Terraform
3. Configure CI/CD pipelines for automated deployment
4. Conduct thorough testing in a staging environment
5. Plan and execute the production deployment
