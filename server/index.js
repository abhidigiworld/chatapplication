const express=require('express');
const cors=require('cors');
const {Server} =require('socket.io');
const {createServer} = require('http');
const app=express();

const port=3000 || process.env.PORT;


app.use(cors);
const server=createServer(app);
const io=new Server(server,{cors : {
    origin:"*",
    methods:["GET","POST"],
    credentials:true,
}});

app.get("/",(req,res)=>{
    res.send("Get called from the server");
})

io.on('connection',(socket)=>{
    console.log("socket connected");
    console.log(socket.id);
})


server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

