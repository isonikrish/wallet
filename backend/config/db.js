import {neon} from '@neondatabase/serverless'
import dotenv from "dotenv";
dotenv.config()


//Create a sql connection to the database
export const sql = neon(process.env.DATABASE_URL);
