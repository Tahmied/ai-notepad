import dotenv from 'dotenv'
import { app } from './app.js'
import { connectDB } from './db/connectDatabase.js'

dotenv.config({
    path : './.env'
})

connectDB()
.then (()=> {
    app.listen(process.env.PORT || 8000 , ()=> {
        console.log(`server is running at port ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log(`couldn't connect to the database in server.js due to ${err}`);
})