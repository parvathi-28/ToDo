import * as express from 'express'
import { TaskRoutes } from './task.router'
class AppRoutes {
    constructor(){}
    public routes(app: express.Application) {

        app.use('/task', new TaskRoutes(app).router)
    }
}

export default AppRoutes