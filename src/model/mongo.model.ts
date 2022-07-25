import * as mongoose from "mongoose"
import { ITask, TaskState } from "./interfaces/itask";
var taskSchema = new mongoose.Schema({

    taskId: { type: String, max: 100, required: true, unique: false },
    taskName: { type: String, max: 100, required: true, unique: false },
    tree: [{ type: String, max: 100, required: false, unique: false }], //String array 
    nameTree: [{ type: String, max: 100, required: false, unique: false }], //String array of path names
    parent: { type: String, max: 100, required: false, unique: false },
    taskState:{type: TaskState, required: false, unique: false},
    completionDate: { type: Date, required: false, unique: false , default: Date.now() },
    isDeleted: { type: Boolean, required: true, default: false }
     
},
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
    )

const TaskMongoModel = mongoose.model<ITask & mongoose.Document>('TaskModel', taskSchema);
export {TaskMongoModel}