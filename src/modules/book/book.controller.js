import { Book } from "../../../database/models/book.model.js"
import { Auther } from "../../../database/models/auther.model.js"

export const addBook = async(req,res,next)=>{

    try{
        const { title , content , auther, publishedDate} = req.body
        const autherExist = await Auther.findById(auther);
        if (!autherExist) {
          throw Error('Auther not found', { cause: 404 });
        }
        
        const bookExist = await Book.findOne({title});
        if (bookExist) {
          throw Error('book already exist', { cause: 409 });
        }
        const addNewBook = await Book.create({ title , content , auther, publishedDate})
        if(!addNewBook){
            throw Error('failed to add book', {cause:500})
        }
        autherExist.books.push(addNewBook._id);
        await autherExist.save();
        return res.status(201).json({message: "book added successfully ", success: true , data: addNewBook})
    }catch(error){
    return res.status(error.cause || 500 ).json({message: error.message, success: false})
    }

}


export const getAllBooks = async (req,res,next)=>{
       try{ 
        const searchTitle = req.query.title ? req.query.title.trim() : '';
        const searchAuthor = req.query.author ? req.query.author.trim() : '';
        const query = {};
        if (searchTitle) {
          query.title = searchTitle; 
        }
        if (searchAuthor) {
          query.author = searchAuthor; 
        }
        const books = await Book.find(query).limit( 5 )
        return res.status(200).json({message:"success",success: true,  books})
    }
       catch(error){
        return res.status(error.cause || 500 ).json({message: error.message, success: false})
        }
    }


export const getBookById = async (req,res,next)=>{
try{

    const specificBook = await Book.findById(req.params.id)
    if (!specificBook) {
        throw Error('Book not found', { cause: 404 });
      }
    return res.status(200).json({message:"success",success: true,  specificBook})


} catch(error){
        return res.status(error.cause || 500 ).json({message: error.message, success: false})
        }
}
export const updateBookById = async (req,res,next)=>{

    try{
        let updateBook = await Book.findByIdAndUpdate(req.params.id , req.body , {new : true})
        if (!updateBook) {
            throw Error('Book not found', { cause: 404 });
          }
          
        return res.status(200).json({message:"success",success: true,  updateBook})
    
    
    } catch(error){
            return res.status(error.cause || 500 ).json({message: error.message, success: false})
            }
    
    
}
export const deleteBookById = async (req,res,next)=>{


    try{
        let deleteBook = await Book.findByIdAndDelete(req.params.id )
        if (!deleteBook) {
            throw Error('Book not found', { cause: 404 });
          }
          
        return res.status(200).json({message:"success",success: true,  deleteBook})
    
    
    } catch(error){
            return res.status(error.cause || 500 ).json({message: error.message, success: false})
            }
    
}