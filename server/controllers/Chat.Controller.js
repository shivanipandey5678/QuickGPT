import Chat from "../models/Chat.Model.js";

//new chat
export const createChat = async(req,res)=>{
    try {
        const userId= req.user._id;
        const chatData = {
            userId,
            message:[],
            name:'New Chat',
            userName:req.user.name
        }

        await Chat.create(chatData)
        res.json({success:true,message:'Chat created'})
    } catch (error) {
        const userId= req.user._id;
        userName:req.user.name
        res.status(500).json({ message: "Something went wrong in createChat", error: error.message ,success:false,user:req.user});
    }
}


//get all chats 
export const getAllChats = async(req,res)=>{
    try {
        const userId= req.user._id;
        const allChats = await Chat.find({userId}).sort({updatedAt:-1});
        if (!allChats) return res.status(404).json({ message: "Users not found" });
        res.status(200).json({Chats:allChats});

    } catch (error) {
        res.status(500).json({ message: "Something went wrong in getAllChats", error: error.message,success:false });
    }
};


//delete  chat
export const deleteChat = async(req,res)=>{
    try {
        const userId= req.user._id;
        const {chatId}=req.body;
        const delChat = await Chat.deleteOne({_id:chatId ,userId});
        if (!delChat) return res.status(404).json({ message: "chat not found" });
        res.status(200).json({deletedChat:delChat, success:true, message:'chat deleted'});

    } catch (error) {
        res.status(500).json({ message: "Something went wrong in deleteChat", error: error.message,success:false });
    }
};