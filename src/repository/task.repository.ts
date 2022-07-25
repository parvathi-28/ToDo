import { ITask, queryObject, querypart } from "../model/interfaces/itask";
import { TaskMongoModel } from "../model/mongo.model";

export class TaskRepository {

    public static createTask(task: ITask) {
        return new TaskMongoModel(task).save();
    }
    public static getByTaskId(id: string) {
        return TaskRepository.getOne("taskId", id);
    }
    public static getOne(key: string, value: any) {
        return TaskMongoModel.findOne({ [key]: value, "isDeleted":  {$in:[null, false]} });
    }

   
    public static getDuplicateTask(task: ITask) {

        let query = {} as queryObject
        query["tree"] = []
        if(task.parent != null && task.parent != undefined) {
            query["parent"] = task.parent;
            query["tree"] = {$ne: []}
        }
        
        query["taskName"] = task.taskName;
        query["isDeleted"] = {$in:[false]}
        return TaskMongoModel.aggregate([{ $match: query }])
    }

    public static getById(id: string) {
        return TaskRepository.getOne("taskId", id);
    }

    public static getByParentId(id: string) {
        return TaskRepository.getIn("tree", id);
    }

    private static getIn(key: string, value: any) {
        return TaskMongoModel.find({ [key]: { $in: value }, "isDeleted":  {$in:[null, false]}});
    }

    public static deleteMultiple(tasks: ITask[]) {
        let bulkDelete = TaskMongoModel.collection.initializeUnorderedBulkOp();
        tasks.map(item => {
            let query = {} as querypart;
            query["taskId"] = item.taskId;
            let obj = Object.assign({}, query);
            bulkDelete.find(obj).update({ $set: { "isDeleted": true} })
        })
        return bulkDelete.execute()
    }

}