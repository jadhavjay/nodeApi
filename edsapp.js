const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const controller=require('./edsController')
const app=express()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.listen(1000,()=>{
    console.log(`listening 1000`)
})

app.get("/",(req,res)=>{
    res.send("eds api");
})
app.use(cors())
app.use("/controller",controller.get())