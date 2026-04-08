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
    const result = await runGraph(problem)
    console.log('✅ Graph result:', result);
    res.status(200).json({
        message:"graph executed successfully",
        success:true,
        result
    })
})
export default app