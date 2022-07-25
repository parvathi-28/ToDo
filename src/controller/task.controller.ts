import { Request, Response, NextFunction } from 'express';
import { JWTAuth } from '../builder/jwttoken';
import { TaskRequestModelBuilder } from '../builder/taskBuilder';
import { IEmail, ITask } from '../model/interfaces/itask';
import { PromiseChain } from '../promise.chain';
import { TaskRepository } from '../repository/task.repository';
import { InputValidation } from '../validation/input.validation';
export class TaskController{
    constructor() {
    }

    public create(req: Request, res: Response) {
        let requestModel: ITask = req.body;
        let parentTask: ITask | null = null;
        PromiseChain.newChain()
        .then(result => {
            console.log(JSON.stringify(req))
            console.log(JSON.stringify(requestModel))
            return InputValidation.validateField("taskName", requestModel.taskName); 
        })
        .then(result => {
            if(requestModel.parent == null || requestModel.parent == undefined) { return null }
            return InputValidation.validateField("parent", requestModel.parent);
        })
        .then(result => {

            if(result == null){ return null; }
            return TaskController._getTaskById(requestModel.parent)
        })
        .then(result => {
            parentTask= result
            return TaskController._checkDuplicateTask(requestModel);
        })
        .then(result => {
            return new TaskRequestModelBuilder(requestModel, parentTask!!).build()
        })
        .then(task_ => {
            return new Promise<ITask>((resolve, reject) => {

                TaskRepository.createTask(task_).then(result => {
                    console.log("TaskRespository.createTask", JSON.stringify(result));
                    if (result == null || result == undefined ) {

                        console.log("TaskRespository.createTask", "(result == null)");
                        reject("not found");
                        return;
                    }
                    resolve(result);
                }).catch(err => {

                    reject(err);
                });
            });
        })
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            res.send(error)
        })
    }

    private static _getTaskById(id: string) {
        return new Promise<ITask>((resolve, reject) => {
            TaskRepository.getByTaskId(id).then(result => {
                console.log("data" + result);
                if(result == null || result == undefined) {
                    reject("no data found");
                    return;
                }
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    private static _checkDuplicateTask(task: ITask) {
        return new Promise<ITask>((resolve, reject) => {
            TaskRepository.getDuplicateTask(task).then(result => {
                
                if (result == null || result == undefined || result.length == 0) {

                    resolve(null!!)
                    return;
                }
                reject("not found");
                return;
            }).catch(err => {

                reject(err);
            });
        })
    }

    public getById(req: Request, res: Response) {
        let task: ITask = req.body
        PromiseChain.newChain()
            .then(r => {
                return InputValidation.validateRequestParam(req, "id");
            })
            .then(id => {
                task.taskId = id;
                return new Promise<ITask>((resolve, reject) => {
                TaskRepository.getById(task.taskId).then((result: ITask | PromiseLike<ITask> | null) => {
                
                    if (result == null || result == undefined) {
                        reject("not found");
                        return;
                    }
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
            })
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                res.send(error)
            })
    }

    public deleteById(req: Request, res: Response) {
        let taskId: string | null = null;
        let task: ITask = {} as ITask;
        PromiseChain.newChain()
        .then(result => {
            return InputValidation.validateRequestParam(req, "id");
        })
        .then(id => {
            taskId = id;
          
            return TaskController._getTaskById(taskId)
        })
        .then(task_ => {
            task = task_;
            return new Promise<ITask[]>((resolve, reject) => {
                TaskRepository.getByParentId(taskId!!).then(result => {
                   
                    if (result == null || result == undefined || result.length == 0) {
                        resolve(null!!);
                        return;
                    }
                    resolve((result));
                }).catch(err => {

                    reject("error");
                });
            })
        })
        .then(childTasks_ => {
            let tasks: ITask[] = []
            if (childTasks_ != null) { 
                tasks = childTasks_;
            }

            tasks.unshift(task);
            return new Promise((resolve, reject) => {

                TaskRepository.deleteMultiple(tasks).then(result => {
                   console.log(result)
                    if (result == null || result == undefined) {
                        reject("not found");
                        return;
                    }
                    resolve("OK");
                }).catch(err => {

                    reject(err);
                });
            });
        })
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            res.send(error)
        })

    }


    public async createAuth(req: Request, res: Response, next: NextFunction) {

        let requestModel :IEmail = req.body;
           
        if (InputValidation.emailValidate(requestModel.email) == false) {
        
            res.send("not valid");
            return;
        }

        JWTAuth.create(requestModel).then(result => {
 
            res.send(result); 
        }).catch(err => {
            res.send(err);
        });
    }
}