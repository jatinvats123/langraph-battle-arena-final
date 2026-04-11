import express from "express";
import runGraph from "./ai/graph.ai.js";
import { mistralAIModel, cohereModel, geminiModel } from "./ai/models.ai.js";
import { run } from "node:test";
import { success } from "zod";
import cors from "cors"
import z from "zod";
import { HumanMessage } from "langchain";

const app = express();
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
    methods:["GET","POST"],
    credentials:true
}))

// Helper to extract text from LangChain message or string
function extractContent(response: any): string {
    console.log('🔍 Extracting content from response type:', response?.constructor?.name);
    
    if (typeof response === 'string') {
        console.log('✓ Found string response');
        return response;
    }
    
    if (typeof response === 'object' && response !== null) {
        // LangChain AIMessage object
        if (response.content && typeof response.content === 'string') {
            console.log('✓ Found message.content (string)');
            return response.content;
        }
        
        // Fallback for complex content
        if (response.content && Array.isArray(response.content)) {
            console.log('✓ Found message.content (array)');
            return response.content
                .map((c: any) => typeof c === 'string' ? c : c?.text || c?.content || '')
                .join('');
        }
        
        if (response.text && typeof response.text === 'string') {
            console.log('✓ Found response.text');
            return response.text;
        }
        
        if (response.output && typeof response.output === 'string') {
            console.log('✓ Found response.output');
            return response.output;
        }
        
        if (response.message && typeof response.message === 'string') {
            console.log('✓ Found response.message');
            return response.message;
        }
    }
    
    console.log('⚠️ Could not extract content, converting to string');
    return String(response || '');
}

// Judge function
async function runJudge(problem: string, solution_1: string, solution_2: string) {
    const judgeSchema = z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
        solution_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default("")
    });

    const judge = geminiModel.withStructuredOutput(judgeSchema);

    const judgeResponse = await judge.invoke([
        new HumanMessage(`You are a judge tasked with evaluating two solutions to the following problem: ${problem}. Please provide a score between 0 and 10 for each solution, along with your reasoning.
            
Solution 1: ${solution_1}
Solution 2: ${solution_2}

Please evaluate the two solutions and provide scores and reasoning.`)
    ])

    return judgeResponse;
}

app.get("/",async (req,res)=>{
    const result = await runGraph("write a code for fibonacci sequence")
    res.json(result)
})

// Test endpoint for streaming verification
app.get("/test-stream", (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    const testData = "This is a test streaming message to verify streaming works correctly in your application.";
    const chunkSize = 10;
    
    (async () => {
        for (let i = 0; i < testData.length; i += chunkSize) {
            const chunk = testData.substring(i, i + chunkSize);
            res.write(`data: ${JSON.stringify({chunk: chunk})}\n\n`);
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        res.write(`data: ${JSON.stringify({done: true})}\n\n`);
        res.end();
    })();
})

app.post("/invoke",async (req,res)=>{
    const{problem}=req.body
    console.log('📥 Received problem:', problem);
    
    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        console.log('🚀 Starting model invocations...');
        
        // Invoke both models in parallel
        const [response1, response2] = await Promise.all([
            mistralAIModel.invoke(problem),
            cohereModel.invoke(problem)
        ]);
        
        console.log('📦 Response 1 type:', response1?.constructor?.name);
        console.log('📦 Response 2 type:', response2?.constructor?.name);
        
        // Extract content using helper function
        const solution1 = extractContent(response1);
        const solution2 = extractContent(response2);
        
        console.log(`✅ Got responses - Solution 1: ${solution1.length} chars, Solution 2: ${solution2.length} chars`);
        console.log('📄 Solution 1 preview:', solution1.substring(0, 100));
        console.log('📄 Solution 2 preview:', solution2.substring(0, 100));
        
        // Stream solution 1 in chunks - faster and smoother
        const chunkSize = 10;
        const chunkDelay = 15; // milliseconds between chunks for smooth rendering
        
        console.log(`⏳ Starting Solution 1 stream with ${chunkSize} char chunks, ${chunkDelay}ms delay`);
        for (let i = 0; i < solution1.length; i += chunkSize) {
            const chunk = solution1.substring(i, i + chunkSize);
            const eventData = `data: ${JSON.stringify({solution_1_chunk: chunk})}\n\n`;
            res.write(eventData);
            await new Promise(resolve => setTimeout(resolve, chunkDelay));
        }
        
        console.log('📝 Solution 1 streaming complete');
        
        // Small delay between solutions
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Stream solution 2 in chunks - faster and smoother
        console.log(`⏳ Starting Solution 2 stream with ${chunkSize} char chunks, ${chunkDelay}ms delay`);
        for (let i = 0; i < solution2.length; i += chunkSize) {
            const chunk = solution2.substring(i, i + chunkSize);
            const eventData = `data: ${JSON.stringify({solution_2_chunk: chunk})}\n\n`;
            res.write(eventData);
            await new Promise(resolve => setTimeout(resolve, chunkDelay));
        }
        
        console.log('📝 Solution 2 streaming complete');
        console.log('⚖️ Running judge...');
        
        // Run judge on complete solutions
        const judge = await runJudge(problem, solution1, solution2);
        
        console.log('✅ Judge verdict ready');
        
        // Send judge verdict with problem
        res.write(`data: ${JSON.stringify({judge, solution_1: solution1, solution_2: solution2, problem})}\n\n`);
        res.write(`data: [DONE]\n\n`);
        res.end();
    } catch (error: any) {
        console.error('❌ API error:', error);
        const errorMessage = error?.message || String(error) || 'Unknown error';
        res.write(`data: ${JSON.stringify({error: errorMessage})}\n\n`);
        res.end();
    }
})
export default app