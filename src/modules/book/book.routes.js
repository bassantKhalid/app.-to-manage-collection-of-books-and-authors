import { Router } from "express";
import { addBook ,getAllBooks, getBookById, updateBookById, deleteBookById} from "./book.controller.js";
const bookRouter = Router()


bookRouter.post('/', addBook)
bookRouter.get('/', getAllBooks)
bookRouter.get('/:id',getBookById)
bookRouter.patch('/:id',updateBookById)
bookRouter.delete('/:id',deleteBookById)




export default bookRouter