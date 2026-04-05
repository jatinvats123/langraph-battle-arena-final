import {CompiledStateGraph, StateGraph,StateSchema,START,END,type GraphNode} from "@langchain/langgraph";
import z, { promise } from "zod";
import { mistralAIModel, cohereModel, geminiModel } from "./models.ai.js";
import { HumanMessage } from "langchain";

const state = new StateSchema({
    problem:z.string().default(""),
    solution_1:z.string().default(""),
    solution_2:z.string().default(""),
    judge:z.object({
        solution_1_score:z.number().default(0),
        solution_2_score:z.number().default(0),
        solution_1_reasoning:z.string().default(""),
        solution_2_reasoning:z.string().default("")
     })
})

const solutionNode:GraphNode<typeof state>= async(state)=>{
    const[mistralResponse,cohereResponse]= await Promise.all([
        mistralAIModel.invoke(state.problem),
        cohereModel.invoke(state.problem),
    ])
    return {
        solution_1:mistralResponse.text,
        solution_2:cohereResponse.text,
    }
}


const judgeNode:GraphNode<typeof state>=async(state)=>{
    const{problem,solution_1,solution_2}=state

    const judgeSchema = z.object({
        solution_1_score:z.number().min(0).max(10),
        solution_2_score:z.number().min(0).max(10),
        solution_1_reasoning:z.string().default(""),
        solution_2_reasoning:z.string().default("")
    });

    const judge = geminiModel.withStructuredOutput(judgeSchema);

    const judgeResponse = await judge.invoke([
        new HumanMessage(`You are a judge tasked with evaluating two solutions to the following problem: ${problem}. Please provide a score between 0 and 10 for each solution, along with your reasoning.
            
Solution 1: ${solution_1}
Solution 2: ${solution_2}

Please evaluate the two solutions and provide scores and reasoning.`)
    ])


const {solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning}=judgeResponse
    return {judge:{solution_1_score,solution_2_score,solution_1_reasoning,solution_2_reasoning}}

}
const graph = new StateGraph(state)
.addNode("solution",solutionNode)
.addNode("judge_node",judgeNode)
.addEdge(START,"solution")
.addEdge("solution","judge_node")
.addEdge("judge_node",END)
.compile()

// started graph with problem invoke graph with provblem starting graph
export default async function (problem:string){
    const result = await graph.invoke({problem:problem})
    return result
}
