const express = require("express")
const path = require("path");
const { json } = require("stream/consumers");
const app = express()
const app2 = express()
app.use(express.json())


let arr= []
id=1


app.listen(3005,()=>{
    console.log("server started")
})

app.use("/note/api1",(req,res)=>{
    res.send("Hello from API V1 🚀")
})

app.use(express.static(path.join(__dirname, "fend")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "fend", "index.html"));
});

app.post("/note",(req,res)=>{
    const data = req.body
    console.log(data)

    arr.push({
        "id":id,
        "title":data.title,
        "content":data.content
    })
    id=id+1

    console.log(arr)
    res.json({ success: true})  
})

app.get("/note",(req,res)=>{
    res.json(arr)
})

app.delete("/note",(req,res)=>{
    const data =req.body
    console.log(data)
    arr=arr.filter(el=>el.id != data.id)
    console.log(arr)
    res.json({ success: true})
})







