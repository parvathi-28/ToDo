export interface ITask {
    id: string;
    taskId: string;
    taskName: string;
    tree: string[];
    nameTree: string[];
    parent: string;
    taskState: TaskState;
    completionDate: Date;
} 

export enum TaskState {
    PENDING = "Pending",
    INPROGRESS = "In-progress",
    COMPLETED = "Completed"
}

export interface queryObject {
    taskName: string;
    tree: object;
    parent: string;
    isDeleted: object;
}

export interface querypart{
    taskId: string
}

export interface IEmail{
    email: string; 
}

export interface ITokenData {
    token: string;
    expiresIn: number;
}