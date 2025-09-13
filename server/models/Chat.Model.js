import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    userId:{type:String , ref:'User',required:true},
    userName:{type:String,required:true},
    name:{type:String,required:true},
    message:[{
        isImage:{type:Boolean,required:true,default:false},
        isPublished:{type:Boolean,required:true,default:false},
        role:{type:String,required:true},
        content:{type:String,required:true},
        timestamp:{type:Number,required:true,default:Date.now},
    }]

},{timestamps:true});


const Chat = mongoose.model('Chat', chatSchema);
export default Chat;