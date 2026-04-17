const express = require("express")
const path = require("path");
const app = express()
const app2 = express()


app.listen(3005,()=>{
    console.log("server started")
})

app.use("/todo",(req,res)=>{
    res.send("Hello from API V1 🚀")
})

app.use(express.static(path.join(__dirname, "fend")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "fend", "index.html"));
});