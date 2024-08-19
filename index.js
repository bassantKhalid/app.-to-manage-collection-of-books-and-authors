import express from 'express'
import mongoose,{Schema , model} from 'mongoose'
import { dbConnection } from './database/dbConnection.js'
import bookRouter from './src/modules/book/book.routes.js'
import autherRouter from './src/modules/auther/auther.routes.js'
const app = express()
const port = 5000
app.use(express.json())
app.use('/book', bookRouter)
app.use('/auther', autherRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))