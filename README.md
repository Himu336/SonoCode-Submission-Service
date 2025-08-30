# SonoCode - Submission Service

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![BullMQ](https://img.shields.io/badge/BullMQ-D83A3A?style=for-the-badge)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

This microservice acts as the central orchestrator for the entire code submission and evaluation process. It serves as the primary API ingress for new submissions and is responsible for coordinating the workflow between various other services in the SonoCode ecosystem.

---

## Core Responsibilities

* **High-Performance API:** Provides a fast, low-overhead API built with Fastify for handling a high volume of incoming code submissions.
* **Workflow Orchestration:** Coordinates the multi-step submission process, including fetching problem data, queuing jobs, and updating final statuses.
* **Robust Job Queuing:** Uses BullMQ to push new submission jobs onto a Redis message queue, ensuring reliable, persistent, and efficient task offloading.
* **State Management:** Manages the lifecycle and state of each submission (e.g., `Pending`, `Success`, `Failed`) in its dedicated MongoDB collection.

---

## 📝 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/submissions` | Creates a new submission, persists it, and queues it for evaluation. |
| `GET` | `/api/v1/submissions/:id` | Retrieves the status and details of a specific submission. |

---

## 💡 System Design Pointers

* **Saga Pattern Orchestrator:** The submission process is a distributed transaction. This service acts as the orchestrator in a **Saga pattern**. It manages the sequence of operations across services and is responsible for maintaining the state of the overall transaction.
* **Decoupling & Resilience:** The BullMQ/Redis queue is a critical resilience point. If the `Evaluator Service` is down, the `Submission Service` can continue accepting submissions without interruption. The jobs remain persisted in Redis, waiting for the worker to come back online, which prevents data loss and ensures high availability.
* **Centralized State Machine:** This service effectively acts as a state machine for submissions. It is the single source of truth for a submission's status, transitioning it from `Pending` to a final state like `Success` or `Failed`.

---

## ✨ Advanced Backend Concepts Implemented

* **Microservice Orchestration:** This service is a prime example of an **orchestrator pattern**. It directs other specialized services (`Problem Service`, `Evaluator Service`) to perform their tasks in a coordinated sequence.
* **High-Throughput Job Queuing with BullMQ:** Instead of basic Redis commands, the service uses BullMQ, a production-grade job queue system. This provides advanced features like job persistence, atomicity, and reliability, ensuring no submission is lost even if a service restarts.
* **Performance-Oriented API Design with Fastify:** The choice of **Fastify** is a key architectural decision focused on performance. Unlike traditional frameworks, Fastify uses a schema-based approach to optimize JSON serialization, a common bottleneck in Node.js applications. By defining schemas for routes, it compiles highly efficient serialization functions, significantly reducing API response latency and maximizing throughput. This is critical for a service that acts as the primary, high-traffic entry point for all user submissions.
* **Hybrid Communication Patterns:** The service intelligently uses both synchronous and asynchronous communication. It makes a **synchronous REST call** (`axios`) to the `Problem Service` for immediate data retrieval and then switches to **asynchronous job queuing** (BullMQ) to offload the long-running evaluation task.

