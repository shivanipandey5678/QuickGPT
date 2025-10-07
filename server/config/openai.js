import OpenAI from "openai";

//Config openai
export const openai = new OpenAI({
    apiKey:process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});