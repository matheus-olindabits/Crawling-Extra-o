import { Router } from "express";
import crawlingController from "../app/modules/crawling/controllers/crawling_controller.js";


const routes = Router();

routes.get('/crawling', crawlingController.crawlingDocument);

export default routes;
