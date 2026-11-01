import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Example architecture seed
  const architecture = await prisma.architecture.create({
    data: {
      name: "Sample Microservices Architecture",
      tags: ["example", "microservices"],
      components: {
        create: [
          {
            name: "API Gateway",
            kind: "API_GATEWAY",
            capacityRps: 5000,
            baseLatencyMs: 20,
          },
          {
            name: "User Service",
            kind: "MICROSERVICE",
            capacityRps: 2000,
            baseLatencyMs: 15,
          },
          {
            name: "Postgres DB",
            kind: "DATABASE",
            capacityRps: 1500,
            baseLatencyMs: 10,
          },
        ],
      },
      connections: {
        create: [
          {
            sourceId: "api-gateway",
            targetId: "user-service",
            protocol: "HTTP",
          },
          {
            sourceId: "user-service",
            targetId: "postgres-db",
            protocol: "TCP",
          },
        ],
      },
    },
  });

  console.log("Seeded architecture:", architecture.id);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
