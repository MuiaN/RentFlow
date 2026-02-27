import type { Express } from "express";
import { type Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // This is a strictly frontend-only demo app using mock data.
  // No backend API routes are registered.
  // The frontend handles all data in-memory via a React Context.

  return httpServer;
}
