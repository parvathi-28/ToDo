import express from 'express';
import mongoose from 'mongoose';
import AppRoutes from './router/app.router'

const port: number = 5000;
const dbUri: string = "mongodb://localhost:27017/TodobackendDb"
const app:express.Application = express()
var appRoutes =  new AppRoutes()

app.listen(port, async ()=> {
    console.log('server listening')
    await connectDB()
    appRoutes.routes(app)
});

async function connectDB() {
    try{
    await mongoose.connect(dbUri)
    console.log("connected to DB")
    }
    catch(error){
        console.error("couldnot connect to DB")
        process.exit(1)
    };
    
}
