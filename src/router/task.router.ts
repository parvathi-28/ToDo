import * as express from 'express';
import { TaskController } from '../controller/task.controller';
export class TaskRoutes {
    router: express.Router;

    constructor(app: express.Application) {
        this.router = express.Router()
        let controller = new TaskController()
        this.router.post('/',controller.create)
        this.router.post("/createauth", controller.createAuth);
        this.router.get("/:id", controller.getById);
        this.router.delete("/:id", controller.deleteById);
    }
}