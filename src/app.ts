import express, { Express } from "express";
import cors from "cors";
import documentRouter from "./routes/document.js";

class App {

  server: Express;

  constructor() {
    this.server = express(); 
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors({
      origin: ["http://localhost:3000"]
    }));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));  
  }

  routes() {
    this.server.use("/document", documentRouter);
  }

}

export default new App().server;