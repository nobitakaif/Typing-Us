import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/test", async (req,res)=>{
    const test = "My name is kaif, and i'm from Delhi"
    res.status(200).json({
        test : test
    })
})

app.listen(8080, ()=>{
    console.log("server is running on port 8080")
})