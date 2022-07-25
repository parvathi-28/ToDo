import { ITask } from "../model/interfaces/itask";
import { InputValidation } from "../validation/input.validation";
import { v4 as uuid } from 'uuid';
import { TaskDTO } from "./taskDTO";
export class TaskRequestModelBuilder {

    tasks: ITask;
    parentTask: ITask;

    constructor(task: ITask, parent: ITask) {

        this.tasks = task;
        this.parentTask = parent
    }

    public build(): Promise<ITask> {

        return new Promise((resolve, reject) => {

            try {

                let tasks = TaskRequestModelBuilder.mapTask(this.tasks, this.parentTask)
                resolve(tasks);
            } catch (error) {
                reject("error on bulding request model");
            }
        });
    }

    static mapTask(taskNode: ITask, parent: ITask) {

        let parentTree: any[] = [];
        let nameTree: any[] = [];
        let completionDate = new Date();
    
        if (taskNode == undefined || taskNode == null) {
    
            console.log("taskNode == undefined");
            throw "mapTask taskNode == undefined"
        }
    
        if (InputValidation.stringValidate(taskNode.taskId) == false) {
            taskNode.taskId = uuid();
        }
    
        try {
    
            let taskModel: TaskDTO = new TaskDTO(taskNode as unknown as ITask)
    
            if(parent != null && parent != undefined) {
    
                if (parent.tree != undefined && parent.tree != null) {
                parentTree = parent.tree;
                }
    
                if (InputValidation.stringValidate(parent.taskId)) {
                    parentTree.push(parent.taskId);
                }
    
                if (parent.nameTree != undefined && parent.nameTree != null) {
                    nameTree = parent.nameTree;
                }
                
    
                if (InputValidation.stringValidate(parent.taskName)) {
                    nameTree.push(parent.taskName);
                }
    
                if (parent.taskState == undefined || parent.taskState == null) {
                    taskModel.taskState = undefined!!;
                } else {
                   
                    taskModel.taskState = taskNode.taskState = parent.taskState
                }
    
                completionDate = parent["completionDate"]
    
            }
           
    
            taskNode["tree"] = parentTree
            taskModel.tree = parentTree
    
            taskNode["nameTree"] = nameTree
            taskModel.nameTree = nameTree
    
            taskModel["completionDate"] = completionDate
            
           
    
            return taskModel
    
           
        } catch (error) {
            throw error;
        }
    }
}