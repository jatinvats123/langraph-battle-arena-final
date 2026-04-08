import express from "express";
import runGraph from "./ai/graph.ai.js";
import { run } from "node:test";
import { success } from "zod";
import cors from "cors"
const app = express();
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true
}))

app.get("/",async (req,res)=>{
    const result = await runGraph("write a code for fibonacci sequence")
    res.json(result)
})
app.post("/invoke",async (req,res)=>{
    const{problem}=req.body
    console.log('📥 Received problem:', problem);
    
    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    try {
        const result = await runGraph(problem)
        console.log('✅ Graph result:', result);
        
        // Stream the complete result
        res.write(`data: ${JSON.stringify(result)}\n\n`)
        res.write(`data: [DONE]\n\n`)
        res.end()
    } catch (error) {
        console.error('❌ Graph error:', error);
        res.write(`data: ${JSON.stringify({error: error.message})}\n\n`)
        res.end()
    }
})
export default app