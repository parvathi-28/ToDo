import { ITask, TaskState } from "../model/interfaces/itask";

export class TaskDTO implements ITask {
  

    id: string;
    taskId: string;
    tree: string[];
    nameTree!: string[];
    parent: string;
    taskName: string;
    taskState!: TaskState;
    completionDate: Date

    constructor(model: ITask) {
       
        this.id = model.id;
        

        this.taskId = model.taskId;
        this.taskName = model.taskName;
    

        this.tree = model.tree;
        this.parent = model.parent;
        

        this.completionDate = model.completionDate;

        if(this.taskState != undefined && this.taskState != null) {
            this.taskState = model.taskState
        }
        
       
    }
  
}