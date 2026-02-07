//text based ai chat message
import Chat from "../models/Chat.Model.js";
import User from "../models/User.js";
import axios from 'axios';
import imagekit from "../config/imageKit.js";
import { openai } from "../config/openai.js";



export const textMessageController = async (req, res) => {
  try {
      const userId = req.user._id;
      if (req.user.credit < 1) {
          return res.json({
            success: false,
            message: "You don't have enough credits to use this feature",
          });
        }
    const body = req.body || {};
    const { chatId, prompt, persona } = body;
    if (!chatId || prompt === undefined || prompt === null) {
      return res.status(400).json({
        success: false,
        message: "Request body must include chatId and prompt (JSON, Content-Type: application/json).",
      });
    }
    const chat = await Chat.findOne({ userId, _id: chatId });
    chat.message.push({ role: "user", content: prompt, timestamp: Date.now() });

    const systemPrompts = {
      hitesh: "You are Hitesh Sir, a helpful and knowledgeable mentor. Reply in a friendly, teaching style. Keep responses clear and practical.",
      zakir: "You are Zakir, a helpful and friendly guide. Reply in a warm, supportive and easy-to-understand way.",
    };
    const systemContent = persona ? systemPrompts[persona] : null;

    const messages = systemContent
      ? [
          { role: "system", content: systemContent },
          { role: "user", content: prompt },
        ]
      : [{ role: "user", content: prompt }];

    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages,
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      
    };
    chat.message.push(reply);
    await chat.save();
    await User.updateOne({ _id: userId }, { $inc: { credit: -1 } });
    return res.json({ success: true, reply });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};



//image generation messages
export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    if (req.user.credit < 2) {
      return res.json({
        success: false,
        message: "You don't have enough credits to use this feature",
      });
    }
 
    const { prompt, chatId, isPublished } = req.body;
    const chat = await Chat.findOne({ _id: chatId, userId });
    chat.message.push({ role: "user", content: prompt, timestamp: Date.now() });

    //encode prompt
    const encodedPrompt = encodeURIComponent(prompt)

    const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;
    
    const aiImageResponse = await axios.get(generatedImageUrl,{responseType:'arraybuffer'})

    //convert to base64
    const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,"binary").toString('base64')}`

    const uploadResponse = await imagekit.upload({
        file: base64Image,
        fileName:`${Date.now()}.png`,
        folder:'quickgpt'
    })

    const reply = {
        role:'assistant',
        content:uploadResponse.url,
        timestamp: Date.now(),
        isImage: true,
        isPublished
      };

      chat.message.push(reply)
      await chat.save()
      await User.updateOne({ _id: userId }, { $inc: { credit: -2 } });
      res.json({success:true, reply})
  } catch (error) {

    res.json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
