import "dotenv/config";   // .env ko auto load kar lega

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import UserRouter from './router/User.Routes.js';
import ChatRouter from './router/Chat.Route.js';
import messageRouter from "./router/Message.Route.js";
import creditRouter from "./router/Credits.Route.js";
import { stripeWebhooks } from "./controllers/webHook.Controller.js";
const app= express();

//build in middlewares
app.use(express.json())
app.use(cors())



//connecting to db
await connectDB();

//Stripe webhooks
app.post('/api/stripe',express.raw({type:'application/json'}),stripeWebhooks)

//routes
app.use('/api',UserRouter)
app.use('/api',ChatRouter)
app.use('/api/message',messageRouter)
app.use('/api/credits',creditRouter)

//health-check route
app.get('/health',(req,res)=> {
    console.log("well - health...")
    res.send("well - health...")
})

app.listen(8000,()=>{
    console.log('Server is live')
})