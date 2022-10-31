import express from "express"
import userRouter from "./features/users/routes.js"

const server = express();
const port = process.env.PORT || 8080

server.use(express.json())
server.use('/users', userRouter)
server.listen(port, ()=>console.log(`server listens on port ${port}`))
