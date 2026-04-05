
import dotenv from "dotenv";
dotenv.config();
const config = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY as string,
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY as string,
    COHERE_API_KEY: process.env.COHERE_API_KEY as string
};
export default config;