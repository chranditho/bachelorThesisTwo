# ConIdea: the microservices version

This is the **`distributed`** branch of the code for my bachelor thesis
*"From Monolith to Microservices: A Migration Case Study Using NestJS"* (Hochschule Campus Wien, 2025,
written in German; [abstract](https://pub.hcw.ac.at/obvfcwhs/content/titleinfo/12219878)).
The same application as a **monolith** is on the [`main`](../../tree/main) branch. Its README has the
thesis summary and results; this one describes the architecture of the migrated system.

## Architecture

```text
Angular frontend ──HTTP──▶ conidea-api   REST API, unchanged for the frontend (the BFF)
                               │
                               │  RabbitMQ request/response
                               │  queues: ideas_queue, users_queue
                     ┌─────────┴─────────┐
                     ▼                   ▼
                 ideas-api           users-api      NestJS microservices
                     └───── data in MongoDB ─────┘
```

| Project | Role |
| --- | --- |
| `apps/conidea-api` | The REST API the frontend calls (port 3000). It only forwards: each request is sent as a message (for example `{ cmd: 'get_all_ideas' }`) to the service that owns the domain, and the answer goes back to the caller. |
| `apps/ideas-api` | Microservice for ideas, drafts, comments and validated status changes. Consumes `ideas_queue`. |
| `apps/users-api` | Microservice for users and roles. Consumes `users_queue`. |
| `apps/model` | TypeScript types shared by the frontend and all services. |
| `apps/conidea-ui` | The Angular frontend. |

As described in the thesis, the BFF keeps the API compatible with the existing frontend.
The `*-e2e` projects hold the API and UI tests.

## Running it

You need Node.js (LTS) and Docker.

```bash
npm ci
docker compose up --build
```

This starts `conidea-api` (port 3000), `ideas-api` (3001), `users-api` (3002), MongoDB and RabbitMQ
(AMQP on 5672, management UI on 15672). The services read their settings from environment variables:

| Variable | Meaning | Default |
| --- | --- | --- |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/conidea` |
| `RMQ` | RabbitMQ URL | `amqp://localhost:5672` |
| `PORT` | HTTP port of `conidea-api` | `3000` |
| `CORS_ORIGIN` | allowed origin of `conidea-api` | `*` |

The compose file loads them from env files that are not committed (for example
`apps/conidea-api/.env.local`); see `docker-compose.yml`.

For development without Docker for the services themselves, start RabbitMQ and MongoDB, then run each project:

```bash
npx nx start rabbitmq          # runs RabbitMQ in Docker; `npx nx stop rabbitmq` removes it
npx nx serve ideas-api
npx nx serve users-api
npx nx serve conidea-api
npx nx serve conidea-ui
```

## Deployment

Notes on deploying this system to Azure are in `azure-deployment-plan.md`,
`azure-deployment-readme.md`, `azure-deployment-summary.md` and `azure-next-steps-guide.md`;
`azure-pipelines.yml` is an Azure DevOps pipeline definition.

## Benchmarks

The k6 load-test scripts and their results are not part of this repository. Method and results are
described in the thesis.
