import express from 'express'
import route from './routes'
import path from 'path'
import cors from 'cors'
const app = express();
require('dotenv').config()

app.use(express.json());

app.get('/user',(req,res)=>{
    res.send('kdlksldksds')
})
app.use(cors())
app.use(route)
app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads')))
app.listen(3333)