# ConIdea: code for a monolith-to-microservices migration study

Code companion to my bachelor thesis **"From Monolith to Microservices: A Migration Case Study Using NestJS"** (German title: *Vom Monolithen zu Microservices: Eine Migrationsfallstudie mit NestJS*).

- **Author:** Christoph Andreas Thonhauser
- **Programme:** Computer Science and Digital Communications, Hochschule Campus Wien
- **Advisor:** Igor Miladinovic
- **Submitted:** June 2025, written in German
- **Record:** [abstract in the university's publication database](https://pub.hcw.ac.at/obvfcwhs/content/titleinfo/12219878) (no full text available)

## What the thesis found

The thesis migrates a monolithic NestJS backend to microservices inside an Nx monorepo: tightly coupled domains become autonomous services, RabbitMQ carries asynchronous communication, and a backend-for-frontend (BFF) keeps the API compatible with the existing frontend. It evaluates the result with Grafana k6 benchmarks under controlled load plus a qualitative reflection on the development experience.

- The monolith has lower average response times for simple operations.
- Under high load the microservices scale better, fail less and have more consistent latencies.
- In a stress test with 400 concurrent users the monolith's error rate was **18.56%**, the distributed system's **2.90%**.
- The microservices had **22% lower p95 latency** under mixed load.
- The benefits for growing systems are real, but they come with extra operational discipline and tooling.

## The application

ConIdea is a small idea-management app. Users submit ideas (title and description) or save drafts. Ideas move through the statuses *Submitted*, *In Review*, *Accepted*, *Rejected* and *Finished*, and can be commented on; status changes are validated on the server. There are two roles, *User* and *Reviewer*.

## Two branches, one application

| Branch | Architecture |
| --- | --- |
| **`main`** (this one) | **Monolith.** One NestJS API (`conidea-api`) on MongoDB, an Angular frontend (`conidea-ui`) and a shared `model` library. |
| **[`distributed`](../../tree/distributed)** | **Microservices.** `conidea-api` stays the REST API the frontend talks to and forwards requests over RabbitMQ to `ideas-api` and `users-api`. All services share the `model` library. Deployment notes for Azure are in the `azure-*.md` files and `azure-pipelines.yml` on that branch. |

The frontend and the e2e tests are the same on both branches, which is what makes the comparison fair.

## Running it

You need Node.js (LTS), Docker and, for local development, a MongoDB on `localhost:27017`.

**Monolith (this branch):**

```bash
npm ci
docker compose -f docker-compose.monolithic.yml up --build
```

The compose file reads `apps/conidea-api/.env.local`, which is not committed. The API reads the database URL from `MONGODB_URI` (default `mongodb://localhost:27017/conidea`). The API is exposed on port 3100; it also serves a Swagger UI.

Without Docker:

```bash
npx nx serve conidea-api
npx nx serve conidea-ui
```

**Microservices:**

```bash
git checkout distributed
npm ci
docker compose up --build
```

This starts `conidea-api` (port 3000), `ideas-api` (3001), `users-api` (3002), MongoDB and RabbitMQ. Each service reads `MONGODB_URI` and `RMQ` (the RabbitMQ URL); see `docker-compose.yml` and each service's `config.ts`.

## Benchmarks

The k6 load-test scripts and their results are not part of this repository. Method and results are described in the thesis.

## Status

A finished thesis project, not a maintained product.
