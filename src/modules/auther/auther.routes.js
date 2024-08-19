import { Router } from "express";
import { addAuther,getAllAuthers,getAutherById,updateAutherById,deleteAutherById } from "./auther.controller.js";
const autherRouter = Router()

autherRouter.post('/',addAuther)
autherRouter.get('/', getAllAuthers)
autherRouter.get('/:id',getAutherById)
autherRouter.patch('/:id',updateAutherById)
autherRouter.delete('/:id',deleteAutherById)

export default autherRouter