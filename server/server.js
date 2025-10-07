import "dotenv/config";  

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import UserRouter from './router/User.Routes.js';
import ChatRouter from './router/Chat.Route.js';
import messageRouter from "./router/Message.Route.js";
import creditRouter from "./router/Credits.Route.js";
import { stripeWebhooks } from "./controllers/webHook.Controller.js";
import path from 'path';

const app= express();

//build in middlewares
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(process.cwd(), 'client/public')));


//connecting to db
await connectDB();

//Stripe webhooks
app.post('/api/stripe',express.raw({type:'application/json'}),stripeWebhooks)

//routes
app.use('/api/user',UserRouter)
app.use('/api/chat',ChatRouter)
app.use('/api/message',messageRouter)
app.use('/api/credits',creditRouter)

//health-check route
app.get('/',(req,res)=> {
    console.log("well - health...")
    res.send("well - health...")
})

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/public', 'favicon.ico'));
  });
  

app.listen(8000,()=>{
    console.log('Server is live')
})