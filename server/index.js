import express from "express"
import "dotenv/config"
import mongoose from "mongoose"

const app = express()
const port = process.env.port
const db_url = process.env.DB_URL

// db connection
 mongoose.connect(db_url).then(()=>{
    console.log("database connected successfuly")
 }).catch((res)=>{
    console.error(res)
 })

 

app.listen(port || 8000, ()=>{
 console.log(`server is running on port: ${port}`)
})